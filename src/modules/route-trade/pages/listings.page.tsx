import { Dialog } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingDetail, ListingNew, Listings } from '../components';

interface ListingsParam {
    id?: string;
}

export const ListingsPage: React.FC = () => {
    const navigate = useNavigate();

    const { id }: ListingsParam = useParams();

    const hasId = id?.length > 0;
    const setId = (id: string) => {
        navigate(hasId ? `./../${id}` : `./${id}`);
    };

    return (
        <>
            <Listings onDetailClick={setId} />
            <Dialog open={hasId}>
                {id === 'new'
                    ? <ListingNew />
                    : <ListingDetail id={id} />}
            </Dialog>
        </>
    );
};
