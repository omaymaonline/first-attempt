import { runAuthMaintenance } from "./auth";

export async function runMaintenance() {
    await Promise.all([
        runAuthMaintenance(),
    ]);
}