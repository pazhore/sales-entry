import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Box, Table, Button } from '@mantine/core';

interface Item {
    item_code: string;  
    item_name: string;  
}

interface RowData {
    vr_num: number;
    sr_num: number;
    item_code: string;
    item_name: string;
    description?: string;
    qty: number;
    rate: number;
}

const TableDemo: FC = () => {
    const [master, setMaster] = useState<Item[]>([]);
    const [rows, setRows] = useState<RowData[]>([]);
    const [selectedItemCode, setSelectedItemCode] = useState<string>('');
    const [selectedItemName, setSelectedItemName] = useState<string>('');
    const [qty, setQty] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://5.189.180.8:8010/item');
                if (Array.isArray(response.data)) {
                    setMaster(response.data);
                } else {
                    console.error('Unexpected API response structure', response.data);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const handleItemCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        setSelectedItemCode(selectedCode);
        const selectedItem = master.find(item => item.item_code === selectedCode);
        if (selectedItem) {
            setSelectedItemName(selectedItem.item_name);
        }
    };

    const handleItemNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        setSelectedItemName(selectedName);
        const selectedItem = master.find(item => item.item_name === selectedName);
        if (selectedItem) {
            setSelectedItemCode(selectedItem.item_code);
        }
    };

    const handleAddRow = () => {
        const selectedItem = master.find(item => item.item_code === selectedItemCode);
        if (selectedItem) {
            const newRow: RowData = {
                vr_num: rows.length + 1,
                sr_num: rows.length + 1,
                item_code: selectedItemCode,
                item_name: selectedItemName,
                description: selectedItemName,
                qty: qty,
                rate: rate,
              
            };
            setRows([...rows, newRow]);
            resetForm();
        }
    };

    const handleSave = async () => {
        try {
            const payload = rows.map(row => ({
                vr_no: row.vr_num,   // Ensure this matches the database column name
                sr_no: row.sr_num,   // Ensure this matches the database column name
                item_code: row.item_code,  // Ensure this matches the database column name
                item_name: row.item_name,  // Ensure this matches the database column name
                description: row.description || "",  // Ensure this matches the database column name
                qty: row.qty,   // Ensure this matches the database column name
                rate: row.rate  // Ensure this matches the database column name
            }));
            
        
            console.log('Sending data:', payload);
            const response = await axios.post('http://5.189.180.8:8010/detail', payload);
            console.log('Data saved successfully:', response.data);
            
            // Reset rows if the data is saved successfully
            setRows([]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error saving data:', error.response?.data);
                console.error('Status Code:', error.response?.status);
                console.error('Error Headers:', error.response?.headers);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };
    
    
    

    const resetForm = () => {
        setSelectedItemCode('');
        setSelectedItemName('');
        setQty(0);
        setRate(0);
    };

    return (
        <Box>
            <Table striped withTableBorder mt={10} h={"100%"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Sr No</Table.Th>
                        <Table.Th>Item Code</Table.Th>
                        <Table.Th>Item Name</Table.Th>
                        <Table.Th>Qty</Table.Th>
                        <Table.Th>Rate</Table.Th>
                        <Table.Th>Amount</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td>{row.item_code}</Table.Td>
                            <Table.Td>{row.item_name}</Table.Td>
                            <Table.Td>{row.qty}</Table.Td>
                            <Table.Td>{row.rate}</Table.Td>
                            <Table.Td>{row.qty * row.rate}</Table.Td>
                        </Table.Tr>
                    ))}

                    <Table.Tr>
                        <Table.Td>{rows.length + 1}</Table.Td>
                        <Table.Td>
                            <select
                                style={{ width: "100%" }}
                                value={selectedItemCode}
                                onChange={handleItemCodeChange}
                            >
                                <option value="">Select Item Code</option>
                                {master.map(item => (
                                    <option key={item.item_code} value={item.item_code}>
                                        {item.item_code}
                                    </option>
                                ))}
                            </select>
                        </Table.Td>
                        <Table.Td>
                            <select
                                style={{ width: "100%" }}
                                value={selectedItemName}
                                onChange={handleItemNameChange}
                            >
                                <option value="">Select Item Name</option>
                                {master.map(item => (
                                    <option key={item.item_name} value={item.item_name}>
                                        {item.item_name}
                                    </option>
                                ))}
                            </select>
                        </Table.Td>
                        <Table.Td>
                            <input
                                type="number"
                                style={{ width: "100%" }}
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                            />
                        </Table.Td>
                        <Table.Td>
                            <input
                                type="number"
                                style={{ width: "100%" }}
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                            />
                        </Table.Td>
                        <Table.Td>
                            <input
                                type="number"
                                style={{ width: "100%" }}
                                value={qty * rate} // Calculate amount directly here for display
                                readOnly
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <Button 
                mt={10} 
                onClick={handleAddRow}
                disabled={!selectedItemCode || qty <= 0 || rate <= 0} // Disable button if conditions not met
            >
                Add Row
            </Button>
            <Button mt={10} onClick={handleSave}>
                Save
            </Button>
        </Box>
    );
};

export default TableDemo;
