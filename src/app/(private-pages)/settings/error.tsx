'use client';
import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const Error = () => {
    return (
        <div className="m-auto flex flex-col items-center gap-2">
            <Typography variant="h2">Not Found</Typography>
            <Typography variant="muted">Could not find requested resource</Typography>
            <Link href="/" className={cn(buttonVariants(), 'mt-4')}>
                Return Home
            </Link>
        </div>
    );
};

export default Error;
