import { Common } from '@modules/common';
import React from 'react';

interface ListingDetailProps {
    id: string;
}

export const ListingDetail: React.FC<ListingDetailProps> = ({
    id,
}) => {
    // TODO: use listing query

    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return <Common.Spinner />;
    }

    return (
        <div>
            ListingDetail: {id}
        </div>
    );
};
