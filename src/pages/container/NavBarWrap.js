import { NavbarMinimal } from "./MinimalizedNavbar";
import Linky from "./Linky";
import { useEffect, useState } from "react";
import { IconAdjustments, IconCalendarStats, IconFileAnalytics, IconGauge, IconLock, IconNotes, IconPresentationAnalytics } from "@tabler/icons-react";
export default function NavBarWrap({setGridSize}){
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState(2);
    useEffect(()=> {
        if(open) setGridSize("250px 1fr")
        else setGridSize("80px 1fr")
    }, [open])
    const mockdata = [
        { label: 'Přehled', icon: IconGauge, link: '/app/' },
        {
          label: 'Závody',
          icon: IconNotes,
          initiallyOpened: true,
          link: '/app/competition',
          links: [
            { label: 'Přehled závodů', link: '/app/competition' },
            { label: 'Vytvořit nový závod', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
          ],
        },
        {
          label: 'Lidé',
          link:"/app/peoples",
          icon: IconCalendarStats,
          links: [
            { label: 'Přehled lidí', link: '/app/peoples' },
            { label: 'Střelci', link: '/' },
            { label: 'Rozhodčí', link: '/' },
          ],
        },
        {
          label: 'Propojení',
          icon: IconLock,
          links: [
            { label: 'Promítání výsledků', link: '/' },
            { label: 'Online registrace', link: '/' },
            { label: 'Připojení elektronických terčů', link: '/' },
          ],
          },
        { label: 'Analytika', icon: IconPresentationAnalytics },
        { label: 'Disciplíny', icon: IconFileAnalytics, link: "/app/discipline" },
        { label: 'Střelnice', icon: IconFileAnalytics, link: "/app/ShootingRange" },
        { label: 'Kluby', icon: IconFileAnalytics, link: "/app/clubs" },
        { label: 'Nastavení', icon: IconAdjustments, link: "/app/settings" },
        
       
      ];

    if(open) return <Linky active={active} setActive={setActive} setOpen={setOpen} data={mockdata} />
    if(!open) return <NavbarMinimal active={active} setActive={setActive}  setOpen={setOpen} data={mockdata} />
}