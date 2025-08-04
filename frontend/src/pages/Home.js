import React, {useState} from "react";
import {TextField, IconButton, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return(
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={10}
        >
            <TextField
                variant="outlined"
                placeholder="Seach Youtube Videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{width:400}}
            />
            <IconButton onClick={handleSearch}>
                <SearchIcon/>
            </IconButton>
        </Box>
    );
}