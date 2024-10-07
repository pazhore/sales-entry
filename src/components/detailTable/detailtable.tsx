import { FC } from 'react';
import { Box} from '@mantine/core';
import TableDemo from './table';

interface DetailTableProps {
    

}

const DetailTable: FC<DetailTableProps> = ({ }) => {
    return (
        <>
            <Box w="100vw"   bg={'dark'}>
                <p style={{ color: "white", textAlign: "center", width: "100vw" }}>detail table</p>
                <TableDemo/>
            </Box>
        </>
    );
};

export default DetailTable;