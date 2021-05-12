import defaultSetting from '@/settings';

const title = defaultSetting.title || 'Bot Club';
export default function getPageTitle(str) {
    if (str) {
        return `${str} - ${title}`;
    }
    return `${title}`;
}