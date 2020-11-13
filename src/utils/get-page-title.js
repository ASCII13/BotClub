import defaultSetting from '@/settings';

const title = defaultSetting.title || 'VAndroid';
export default function getPageTitle(str) {
    if (str) {
        return `${str} - ${title}`;
    }
    return `${title}`;
}