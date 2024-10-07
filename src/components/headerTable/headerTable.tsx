import { Box } from '@mantine/core';
import  { FC } from 'react';
import HeaderForm from './table';

interface HeaderTableProps {
  
}

const HeaderTable: FC<HeaderTableProps> = ({}) => {
  return (
    <>
     <Box w={"100vw"} h={"100%"} bg={"gray"}>
    <p style={{ color: "white", textAlign: "center", width: "100vw" }}>header</p>
    <HeaderForm />
     </Box>
    </>
  );
};

export default HeaderTable;