    import type { ColorData } from "@domain/color.domain";
export class ColorsService {
    private readonly _data: Uint8ClampedArray;
    private readonly _step: number;
    private readonly _samples: number[][];
    constructor(data: Uint8ClampedArray, step = 10) {
        this._data = data;
        this._step = step;
        this._samples = this.getSampleColors();
    }

    private colorDistance( c1: number[], c2: number[] ) {
        return Math.sqrt(
            Math.pow(c1[0] - c2[0], 2) +
            Math.pow(c1[1] - c2[1], 2) +
            Math.pow(c1[2] - c2[2], 2)
        );
    }

    private rgbaToHex(r: number, g: number, b: number, a: number): string {
        const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alpha}`;
    }

    getSampleColors(): number[][] {
        if (this._samples?.length > 0) {
            return this._samples;
        }
        const samples: number[][] = [];

        for (let i = 0; i < this._data.length; i += this._step * 4) {
            const a = this._data[i + 3];
            if ( a < 128 ) continue; // Skip transparent pixels
            samples.push([this._data[i], this._data[i + 1], this._data[i + 2]]);
        }

        return samples;
    }

    // -- method to get the most frequent colors in the image

    frecuency( k: number): ColorData[]
    {   
        const colorMap: Record<string, number> = {};
        const countTotal = this._samples.length;
        for (const [r, g, b] of this._samples) {
            const rq = Math.round(r / 24) * 24;
            const gq = Math.round(g / 24) * 24;
            const bq = Math.round(b / 24) * 24;
            const key = this.rgbaToHex(rq, gq, bq, 1)
            colorMap[key] = (colorMap[key] || 0) + 1;
        }
        console.log("Color frequency map:", Object.entries(colorMap)
            .sort((a, b) => b[1] - a[1]));
        return Object.entries(colorMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(([color, count]) => ({
                color: `${color}`,
                porcentage: (count / countTotal) * 100
            }));
    }

    // -- method to get the k-means colors in the image

    kmeans(k: number, maxIterations = 10): ColorData[] {
        let centroids: number[][] = [...this._samples]
                                    .sort(() => Math.random() - 0.5)
                                    .slice(0, k);
        for (let iteration = 0; iteration < maxIterations; iteration++) {
            const clusters: number[][][] = Array.from({ length: k }, () => []);
            for ( const pixel of this._samples ) {
                let minDistance = Infinity;
                let closestCentroidIndex = 0;

                centroids.forEach((centroid, index) => {
                    const distance = this.colorDistance(pixel, centroid);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCentroidIndex = index;
                    }
                });
                clusters[closestCentroidIndex].push(pixel);
            }

            const newCentroids = clusters.map((cluster, i) => {
                if (cluster.length === 0) return centroids[i];
                const avg = [ 0, 0, 0 ];
                for (const pixel of cluster) {
                    avg[0] += pixel[0];
                    avg[1] += pixel[1];
                    avg[2] += pixel[2];
                }
                return avg.map(value => Math.round(value / cluster.length));
            });

            const converged = newCentroids.every((centroid, i) =>
                this.colorDistance(centroid, centroids[i]) < 1
            );

            centroids = newCentroids;

            if (converged) break;
        }
        const finalCounts = new Array(k).fill(0);
        const total = this._samples.length;

        for (const pixel of this._samples) {
            let minDistance = Infinity;
            let closestIndex = 0;

            centroids.forEach((centroid, i) => {
                const d = this.colorDistance(pixel, centroid);
                if (d < minDistance) {
                    minDistance = d;
                    closestIndex = i;
                }
            });

            finalCounts[closestIndex]++;
        }

        return centroids
            .map(([r, g, b], i) => ({
                color: this.rgbaToHex(r, g, b, 1),
                porcentage: parseFloat(((finalCounts[i] / total) * 100).toFixed(2))
            }))
            .sort((a, b) => b.porcentage - a.porcentage);
    }
}