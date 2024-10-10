// src/hooks/useCustomToast.js
import { useToast, Box } from '@chakra-ui/react';

const useCustomToast = () => {
    const toast = useToast();

    const showToast = (status, message) => {
        toast({
            position: 'top',
            render: () => (
                <Box color="white" p={3} bg={status === 'error' ? 'red.500' : 'green.500'} borderRadius="md">
                    <strong>{status === 'error' ? 'Error!' : 'Success!'}</strong>
                    <div>{message}</div>
                </Box>
            ),
            duration: 5000,
            isClosable: true,
        });
    };

    return { showToast };
};

export default useCustomToast;
