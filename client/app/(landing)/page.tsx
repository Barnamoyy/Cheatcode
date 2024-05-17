import Link from "next/link";

import { Button } from "@/components/ui/button";

const Page = () => {
    return (
        <div>
            <Link href={"/sign-up"}>
                <Button variant="link">Sign-up</Button>
            </Link>
        </div>
    );
}

export default Page;