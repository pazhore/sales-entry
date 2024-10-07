import { Grid, NumberInput, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

import { FC } from 'react';

interface HeaderFormProps {

}

const HeaderForm: FC<HeaderFormProps> = ({ }) => {
        const handleSubmit: any = (values: any) => {
            console.log(values);
        }
    return (
        <>
            <form
                method="post"
                onSubmit={handleSubmit}
                >
                <Grid align="center" justify="center" ml={"25%"} mr={"25%"}>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12 }}>
                        <NumberInput
                            label="VR_NO"
                            placeholder="Input placeholder"
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12 }}>
                        <DateInput
                            label="Date"
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12 }}>
                        <TextInput
                            label="Status"
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 8, sm: 12 }}> <NumberInput
                        label="ACC_NO"
                    />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <NumberInput
                        
                            rightSection={"₹"}
                            label="AMOUNT"
                        />
                       <input type="submit" />
                    </Grid.Col>
                </Grid>
            </form>


        </>
    );
};

export default HeaderForm;