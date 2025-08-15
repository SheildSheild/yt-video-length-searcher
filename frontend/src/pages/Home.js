import React, {useState, useEffect} from "react";
import {TextField, IconButton, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import { DropdownMenu } from "radix-ui";
import Wave from 'react-wavify';
import youtubeImage from '../img/Youtube_logo.png';
import izumiImage from '../img/izumi1.png';
import pepeImage from '../img/pepe1.png';

export default function Home() {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);
    const [searchTerm, setSearchTerm] = useState("");

    const [minHours, setMinHours] = useState(null);
    const [minMinutes, setMinMinutes] = useState(null);
    const [maxHours, setMaxHours] = useState(Infinity);
    const [maxMinutes, setMaxMinutes] = useState(null);

    const hoursList = [...Array.from({length: 12}, (_, i) => i), "12+"];
    const minutesList = Array.from({length: 12}, (_, i) => i * 5);

    const titleArray = ["Long-Form YouTube, Made Easy", "Long-Form Content, Without the Search Hassle", "Hours of YouTube, Zero Guesswork", "Find Your Next 2-Hour Rabbit Hole", "Binge Better: Search YouTube by Length", "YouTube’s Best Long-Form, All in One Place"]
    const randomTitle = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const [title] = useState(() => randomTitle(titleArray));

    const navigate = useNavigate();

    const handleSearch = () => {
        if (maxMinutes !== null && maxHours === Infinity){
            setMaxHours(0);
        }
        if (minHours === null){
            setMinHours(0);
        }
        if (minMinutes === null){
            setMinMinutes(0);
        }
        if (maxMinutes === null){
            setMaxMinutes(0);
        }

        const totalMinSeconds = minHours * 3600 + minMinutes * 60;
        const totalMaxSeconds = maxHours * 3600 + maxMinutes * 60;

        if (searchTerm.trim() !== "") {
            navigate(`/results?q=${encodeURIComponent(searchTerm)}&minLength=${parseInt(totalMinSeconds)}&maxLength=${parseInt(totalMaxSeconds)}`);
        }
    };

    return(
        <Box sx={{ minHeight: '100vh', maxWidth: 1200, mx: 'auto', px: 2, height: '100vh', overflow: 'hidden', mt: { xs: 2, sm: 4, md: 8 }}}>
            <Box display="grid" justifyContent="center" alignItems="center" mt={8}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <h1 style={{ fontSize: 'clamp(20px, 4vw, 40px)', margin: 0 }}>
                        {title}
                    </h1>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                        src={youtubeImage}
                        alt="Youtube Logo"
                        style={{ maxWidth: '100%', height: 'auto', width: 'min(60vw, 550px)' }}
                        />
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <TextField
                    variant="outlined"
                    placeholder="Seach Youtube Videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    sx={{width:400, ml: 5}}
                />
                <IconButton onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap='wrap' alignItems="center" gap={8}>
                <Box display="grid" justifyContent="center" flexWrap='wrap' alignItems="center" mt={2} gap={1}>
                    <Box display="flex" color="#ffd49bff">
                        <div>Min Length: </div>
                    </Box>
                    <Box display="flex" gap={1}>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="DropdownTrigger">
                                {minHours === null? "Hours": minHours + " Hours"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {hoursList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMinHours(item)} className="DropdownMenuItem">
                                            <div className="LeftSlot">{item} hrs</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="DropdownTrigger">
                                {minMinutes === null? "Minutes": minMinutes + " Minutes"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {minutesList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMinMinutes(item)} className="DropdownMenuItem">
                                            <div className="LeftSlot">{item} mins</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </Box>
                </Box>
                <Box display="grid" justifyContent="center" flexWrap='wrap' alignItems="center" mt={2} gap={1}>
                    <Box display="flex" color="#ffd49bff">
                        <div>Max Length: </div>
                    </Box>
                    <Box display="flex" gap={1}>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="DropdownTrigger">
                                {maxHours === Infinity? "Hours": maxHours + " Hours"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {hoursList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMaxHours(item)} className="DropdownMenuItem">
                                            <div className="LeftSlot">{item} hrs</div>
                                        </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="DropdownTrigger">
                                {maxMinutes === null? "Minutes": maxMinutes + " Minutes"}
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                                        {minutesList.map(item => (
                                        <DropdownMenu.Item key={item} onSelect={() => setMaxMinutes(item)} className="DropdownMenuItem">
                                            <div className="LeftSlot">{item} mins</div>
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
                    bottom: 0,
                    right: 0,
                    width: 'min(40vw, 500px)',
                    maxWidth: '100%',
                    height: 'auto',
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
                    width: 'min(40vw, 450px)',
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: 1000
                }}
            />
            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 'clamp(80px, 12vh, 160px)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
                >
                <Wave
                    fill="#ffd49bff"
                    paused={false}
                    style={{
                    width: '100%',
                    height: '100%',
                    display: 'block'
                    }}
                    options={{ height: 10, amplitude: 20, speed: 0.2, points: 5 }}
                />
            </div>
        </Box>
    );
}