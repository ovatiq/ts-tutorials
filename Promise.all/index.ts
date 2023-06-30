const fakeApiFetch = async (delay = 2000): Promise<{ data: Record<string, string>[]; status: number }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating a successful API response after the delay
            resolve({ data: [], status: 200 });
        }, delay);
    });
};

/** Completes at 6 seconds */
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

/** Completes at 2 seconds */
export const doThis = async () => {
    const [accounts, supporters, revenues] = await Promise.all([fakeApiFetch(), fakeApiFetch(), fakeApiFetch()]);
    return {
        accounts: accounts.data,
        supporters: supporters.data,
        revenues: revenues.data,
    };
};
