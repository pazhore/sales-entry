import { Box } from '@mantine/core';
import { FC } from 'react';
import DetailTable from '../detailTable/detailtable';
import HeaderTable from '../headerTable/headerTable';

interface MasterProps {
  
}

const Master: FC<MasterProps> = ({}) => {
 

  return (
    <>
          <Box w={"100vw"}>
        <HeaderTable/>
        <DetailTable />
    </Box>
    </>
  );
};

export default Master;
