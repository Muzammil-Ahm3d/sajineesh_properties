import bridgeKansabansa from '@/assets/projects/bridge-kansabansa.jpg';
import bridgeBudhabalanga from '@/assets/projects/bridge-budhabalanga.jpg';
import bridgeGuria from '@/assets/projects/bridge-guria.jpg';
import bridgeRatrichara from '@/assets/projects/bridge-ratrichara.jpg';
import bridgeKatraBelbaria from '@/assets/projects/bridge-katra-belbaria.jpg';
import bridgeKharasrotaJajpur from '@/assets/projects/bridge-kharasrota-jajpur.jpg';
import bridgeKharasrotaSakha from '@/assets/projects/bridge-kharasrota-sakha.jpg';
import bridgeKatraUpperbeda from '@/assets/projects/bridge-katra-upperbeda.jpg';
import bridgeGondipani from '@/assets/projects/bridge-gondipani.jpg';
import bridgeKochila from '@/assets/projects/bridge-kochila.jpg';
import roadTalcher from '@/assets/projects/road-talcher.jpg';
import roadAngulPr from '@/assets/projects/road-angul-pr.jpg';
import roadMaidharpur from '@/assets/projects/road-maidharpur.jpg';
import buildingDhhAngul from '@/assets/projects/building-dhh-angul.jpg';

// Import Gallery specific assets
import kbImg1 from '@/assets/gallery/kansabansa/img-1.jpg';
import kbImg2 from '@/assets/gallery/kansabansa/img-2.jpg';
import kbImg3 from '@/assets/gallery/kansabansa/img-3.jpg';
import kbImg4 from '@/assets/gallery/kansabansa/img-4.jpg';
import kbVideo1 from '@/assets/gallery/kansabansa/video-1.mp4';

export interface Project {
    id: string;
    title: string;
    location: string;
    status: 'Ongoing' | 'Completed';
    type: 'image' | 'video';
    thumbnail: string;
    galleryImages?: string[];
    galleryVideos?: string[];
    description?: string;
}

export const projectsData: Project[] = [
    {
        id: 'kansabansa-bridge',
        title: 'H.L Bridge over River Kansabansa',
        location: 'Balasore, Balasore District, Northern Odisha',
        status: 'Ongoing',
        type: 'image',
        thumbnail: bridgeKansabansa,
        galleryImages: [kbImg1, kbImg2, kbImg3, kbImg4],
        galleryVideos: [kbVideo1],
        description: 'Construction of High-Level bridge on Anantapur–Bankeswarpura Road under Biju Setu Yojana.',
    },
    {
        id: 'ratrichara-bridge',
        title: 'H.L Bridge over River Ratrichara',
        location: 'Puri, Puri District, Eastern Odisha',
        status: 'Ongoing',
        type: 'image',
        thumbnail: bridgeRatrichara,
    },
    {
        id: 'talcher-road',
        title: 'New Road Construction – Talcher Autonomous College',
        location: 'Angul, Angul District, Central Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: roadTalcher,
    },
    {
        id: 'angul-pr-road',
        title: 'PR Road Improvement – Angul',
        location: 'Angul, Angul District, Central Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: roadAngulPr,
    },
    {
        id: 'maidharpur-road',
        title: 'Angul–Maidharpur Road Strengthening',
        location: 'Angul, Angul District, Central Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: roadMaidharpur,
    },
    {
        id: 'dhh-angul',
        title: 'Attendance Rest Shed – DHH Angul',
        location: 'Angul, Angul District, Central Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: buildingDhhAngul,
    },
    {
        id: 'budhabalanga-bridge',
        title: 'H.L Bridge over Budhabalanga River',
        location: 'Mayurbhanj District, Northern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeBudhabalanga,
    },
    {
        id: 'guria-bridge',
        title: 'H.L Bridge over Guria Nallah',
        location: 'Rairangpur, Mayurbhanj District, Northern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeGuria,
    },
    {
        id: 'katra-belbaria',
        title: 'H.L Bridge over River Katra – Belbaria',
        location: 'Baripada, Mayurbhanj District, Northern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeKatraBelbaria,
    },
    {
        id: 'kharasrota-jajpur',
        title: 'H.L Bridge over River Kharasrota – Jajpur',
        location: 'Jajpur, Jajpur District, Eastern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeKharasrotaJajpur,
    },
    {
        id: 'kharasrota-sakha',
        title: 'H.L Bridge over Kharasrota Sakha Nallah',
        location: 'Kendrapada, Kendrapara District, Eastern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeKharasrotaSakha,
    },
    {
        id: 'katra-upperbeda',
        title: 'H.L Bridge over River Katra – Upperbeda',
        location: 'Baripada, Mayurbhanj District, Northern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeKatraUpperbeda,
    },
    {
        id: 'gondipani-bridge',
        title: 'Bridge over Local Nallah – Gondipani',
        location: 'Baripada, Mayurbhanj District, Northern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeGondipani,
    },
    {
        id: 'kochila-bridge',
        title: 'Bridge over Kochila Nallah',
        location: 'Baripada, Mayurbhanj District, Northern Odisha',
        status: 'Completed',
        type: 'image',
        thumbnail: bridgeKochila,
    },
];
