import { notFound } from 'next/navigation';

import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';

import OverridesIngestionForm from '../components/overrides-ingestion-form';
import { OverridesType } from '../components/schema';

const CurationUpdatePage = async ({
    params: { collectionId },
    searchParams,
}: {
    params: { collectionId: string };
    searchParams: { id?: string };
}) => {
    if (!searchParams.id) notFound();
    const data: OverridesType = await client.collections(collectionId).overrides(searchParams.id).retrieve();
    const defaultData = {
        ...data,
        ...(data.rule && {
            rule: {
                ...data.rule,
                ...(data.rule.query && { curateByQuery: true }),
                ...(data.rule.filter_by && { curateByFilter: true }),
                ...(data.rule.tags?.length && { curateByTags: true }),
            },
        }),
        ...(data.includes?.length && { pinDocuments: true }),
        ...(data.excludes?.length && { hideDocuments: true }),
        ...(data.filter_by && { filterDocuments: true }),
        ...(data.sort_by && { sortDocuments: true }),
        ...(data.replace_query && { replaceDocuments: true }),
        ...(data.metadata && { customMetadata: true }),
        ...(data.effective_from_ts && { effectiveFrom: true }),
        ...(data.effective_to_ts && { effectiveTo: true }),
    };
    return (
        <div className="flex h-full w-full flex-col gap-8">
            <div className="flex flex-1 flex-col gap-4 bg-muted/40 rounded-lg p-4 md:gap-8 md:p-10">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Curation
                </Typography>
                <OverridesIngestionForm defaultData={defaultData as unknown as OverridesType} collectionId={collectionId} />
            </div>
        </div>
    );
};

export default CurationUpdatePage;
