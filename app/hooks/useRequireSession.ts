import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useRequireSession(redirectPath: string) {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace(redirectPath);
        },
    });
    return session;
}
