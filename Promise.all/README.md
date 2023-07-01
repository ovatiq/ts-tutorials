Please give it a star if this helped you. Contact me at @ https://twitter.com/blacnoon for any questions

# Promise.all

Common mistakes of `async/await` usage is using them synchronously.

#### Consider the following:

❌ Using async in a synchronous manner

```
/** If each API call took 2 seconds this completes at 6 seconds */
export const dontDoThis = async () => {
    const accounts = await fakeApiFetch();
    const supporters = await fakeApiFetch();
    const revenues = await fakeApiFetch();
    return {
        accounts: accounts.data,
        supporters: supporters.data,
        revenues: revenues.data,
    };
};
```

✔️ Using async to allow parallel operations

```
/**
   If each API call took 2 seconds this completes at 2 seconds.
   This is because the Promise.all operation will only take as long as the longest response takes.
   For example, if supporters take 5 seconds and accounts and revenues take 2, Promise.all will complete at 5 seconds.
   However, the accounts and revenues will complete at 2 and can still be operated against if you use thenables
   and can likely finish before the 5 seconds.
*/
export const doThis = async () => {
    const [accounts, supporters, revenues] = await Promise.all([fakeApiFetch(), fakeApiFetch(), fakeApiFetch()]);

    // tbd - what about error handling?

    return {
        accounts: accounts.data,
        supporters: supporters.data,
        revenues: revenues.data,
    };
};
```

#### Benchmark

```
Benchmark started.

Running benchmarks... -
dontDoThis x 0.17 ops/sec ±0.17% (5 runs sampled)

Running benchmarks... |
doThis x 0.50 ops/sec ±0.18% (7 runs sampled)

Benchmark finished.

Fastest benchmark: doThis
```

#### Misc

You might ask, what's the practical application? How can I use this in my app?

If you're interested in that guide please let me know @ https://twitter.com/blacnoon
