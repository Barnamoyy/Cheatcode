import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
    return (
        <div>
            <Link href={"/sign-up"}>
                <Button variant="link">Sign-up</Button>
            </Link>
            <UserButton />
        </div>
    );
}

export default Page;