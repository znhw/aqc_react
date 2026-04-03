import { IconButton } from '../ui/IconButton';
import { DiscordIcon } from '../ui/DiscordIcon';

export function Header() {
    return (
        <header className="header">
            <h1 className="">Animeness</h1>
            <div                    >
                <IconButton 
                    icon={<DiscordIcon size={20} />} 
                    label="Join Discord" 
                    onClick={() => window.open('https://discord.gg/6syJbuwr', '_blank')}
                    className='discord-btn'
                />
            </div>
        </header>
    );
}