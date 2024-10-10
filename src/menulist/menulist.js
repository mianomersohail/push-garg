import './menulist.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    
} from '@chakra-ui/react';
import { Button } from '@mui/material';

export default function MenuLists({ valueone, valuetwo, valuethree, valuefour, onSelect }) {
    return (
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} className='paid-btn-one munebutton' colorScheme='blue'>
                Menu
            </MenuButton>
            <MenuList minWidth='240px'>
                <MenuOptionGroup title='Interests' type='radio'>
                    <MenuItemOption value={valueone} onClick={() => onSelect(valueone)}>
                        {valueone}
                    </MenuItemOption>
                    <MenuItemOption value={valuetwo} onClick={() => onSelect(valuetwo)}>
                        {valuetwo}
                    </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title='More Options' type='checkbox'>
                    <MenuItemOption value={valuethree} onClick={() => onSelect(valuethree)}>
                        {valuethree}
                    </MenuItemOption>
                    <MenuItemOption value={valuefour} onClick={() => onSelect(valuefour)}>
                        {valuefour}
                    </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
}
