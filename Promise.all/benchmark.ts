import Benchmark from "benchmark";
import { dontDoThis, doThis } from ".";

// Show loading indicator
let loadingCounter = 0;
let loadingInterval;

const suite = new Benchmark.Suite()
    .on("start", () => {
        loadingInterval = setInterval(() => {
            const loadingChars = ["|", "/", "-", "\\"];
            process.stdout.write(`\rRunning benchmarks... ${loadingChars[loadingCounter % 4]}`);
            loadingCounter++;
        }, 100);
    })
    .on("cycle", (event: any) => {
        console.log("\n" + String(event.target));
    })
    .on("complete", function () {
        // Stop loading indicator after the benchmarks are finished
        clearInterval(loadingInterval);

        // Find the fastest benchmark
        const fastest = this.filter("fastest").map("name");
        console.log(`Fastest benchmark: ${fastest}`);
    });

// Add the benchmark for dontDoThis
suite.add("dontDoThis", {
    defer: true,
    fn: async (deferred: any) => {
        await dontDoThis();
        deferred.resolve();
    },
});

// Add the benchmark for doThis
suite.add("doThis", {
    defer: true,
    fn: async (deferred: any) => {
        await doThis();
        deferred.resolve();
    },
});

// Run the benchmarks
suite.run({
    async: true,
});
