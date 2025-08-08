import React, {useState} from "react";
import {TextField, IconButton, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import { DropdownMenu } from "radix-ui";
import Wave from 'react-wavify';
import youtubeImage from '../img/Youtube_logo.png';
import izumiImage from '../img/izumi1.png';
import pepeImage from '../img/pepe1.png';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    const [minHours, setMinHours] = useState(0.00000000000000000000001);
    const [minMinutes, setMinMinutes] = useState(0.00000000000000000000001);
    const [maxHours, setMaxHours] = useState(Infinity);
    const [maxMinutes, setMaxMinutes] = useState(Infinity);

    const hoursList = [...Array.from({length: 12}, (_, i) => i), "12+"];
    const minutesList = Array.from({length: 12}, (_, i) => i * 5);

    const titleArray = ["Long-Form YouTube, Made Easy", "Long-Form Content, Without the Search Hassle", "Hours of YouTube, Zero Guesswork", "Find Your Next 2-Hour Rabbit Hole", "Binge Better: Search YouTube by Length", "YouTube’s Best Long-Form, All in One Place"]
    const randomTitle = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const [title] = useState(() => randomTitle(titleArray));

    const navigate = useNavigate();

    const handleSearch = () => {
        const totalMinSeconds = minHours * 3600 + minMinutes * 60;
        const totalMaxSeconds = maxHours * 3600 + maxMinutes * 60;

        if (searchTerm.trim() !== "") {
            navigate(`/results?q=${encodeURIComponent(searchTerm)}&minLength=${parseInt(totalMinSeconds)}&maxLength=${parseInt(totalMaxSeconds)}`);
        }
    };

    return(
        <Box sx={{height: '100vh', overflow: 'hidden'}}>
            <Box display="grid" justifyContent="center" alignItems="center" mt={8}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <h1>{title}</h1>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                        src={youtubeImage}
                        alt="Youtube Logo"
                        style={{
                            width: '550px'
                        }}
                        />
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <TextField
                    variant="outlined"
                    placeholder="Seach Youtube Videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{width:400, ml: 5}}
                />
                <IconButton onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={8}>
                <Box display="grid" justifyContent="center" alignItems="center" mt={2} gap={1}>
                    <Box display="flex">
                        <div>Min Length: </div>
                    </Box>
                    <Box display="flex" gap={1}>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {minHours === 0.00000000000000000000001? "Hours": minHours + " Hours"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {hoursList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMinHours(item)} className="DropdownMenuItem">
                                            <div className="RightSlot">{item} hrs</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {minMinutes === 0.00000000000000000000001? "Minutes": minMinutes + " Minutes"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {minutesList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMinMinutes(item)} className="DropdownMenuItem">
                                            <div className="RightSlot">{item} mins</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </Box>
                </Box>
                <Box display="grid" justifyContent="center" alignItems="center" mt={2} gap={1}>
                    <Box display="flex">
                        <div>Max Length: </div>
                    </Box>
                    <Box display="flex" gap={1}>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {maxHours === Infinity? "Hours": maxHours + " Hours"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {hoursList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMaxHours(item)} className="DropdownMenuItem">
                                            <div className="RightSlot">{item} hrs</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {maxMinutes === Infinity? "Minutes": maxMinutes + " Minutes"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {minutesList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMaxMinutes(item)} className="DropdownMenuItem">
                                            <div className="RightSlot">{item} mins</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </Box>
                </Box>
            </Box>
            <img
                src={izumiImage}
                alt="Izumi mascot"
                style={{
                    position: 'fixed',
                    bottom: -93,
                    right: -80,
                    width: '550px',
                    zIndex: 1000
                }}
            />
            <img
                src={pepeImage}
                alt="Pepe mascot"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '450px',
                    zIndex: 1000
                }}
            />
            <Wave fill='#ffd49bff'
                    paused={false}
                    style={{
                        position: 'fixed',
                        bottom: -10,
                        left: 0,
                        width: '100%'
                    }}
                    options={{
                        height: 5,
                        amplitude: 20,
                        speed: 0.20,
                        points: 5
                    }}
            />
        </Box>
    );
}