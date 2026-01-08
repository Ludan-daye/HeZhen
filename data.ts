
import { Location, Voyage } from './types';

export const LOCATIONS: Record<string, Location> = {
  nanjing: { 
    id: 'nanjing', 
    name: 'Nanjing', 
    chineseName: '南京', 
    lat: 32.0603, 
    lng: 118.7969, 
    description: 'Capital of the Ming Dynasty. The shipyard here built the massive "Treasure Ships".',
    tradeExports: ['Imperial Decrees', 'Gold', 'Silver'],
    tradeImports: ['Tribute']
  },
  liujiagang: { 
    id: 'liujiagang', 
    name: 'Liujiagang', 
    chineseName: '刘家港', 
    lat: 31.45, 
    lng: 121.25, 
    description: 'The starting port. Ships were loaded with massive quantities of silk and ceramics.',
    tradeExports: ['Silk', 'Porcelain', 'Tea', 'Ironware'],
    tradeImports: ['Supplies']
  },
  champa: { 
    id: 'champa', 
    name: 'Champa', 
    chineseName: '占城', 
    lat: 13.7, 
    lng: 109.2, 
    description: 'Modern-day Vietnam. Key for sourcing high-quality fragrant woods.',
    tradeExports: ['Porcelain', 'Silk'],
    tradeImports: ['Aloeswood', 'Lakawood', 'Ebony']
  },
  surabaya: { 
    id: 'surabaya', 
    name: 'Java', 
    chineseName: '爪哇', 
    lat: -7.2575, 
    lng: 112.7521, 
    description: 'A vibrant Hindu-Buddhist kingdom with rich agricultural resources.',
    tradeExports: ['Blue-and-white Porcelain', 'Copper Coins'],
    tradeImports: ['Pepper', 'Saffron', 'Sandalwood', 'Parrots']
  },
  palembang: { 
    id: 'palembang', 
    name: 'Palembang', 
    chineseName: '旧港', 
    lat: -2.9909, 
    lng: 104.7567, 
    description: 'Strategic point in Sumatra. Site of the battle against the pirate Chen Zuyi.',
    tradeExports: ['Silk', 'Calendars'],
    tradeImports: ['Resin', 'Tin', 'Pepper']
  },
  malacca: { 
    id: 'malacca', 
    name: 'Malacca', 
    chineseName: '满剌加', 
    lat: 2.1896, 
    lng: 102.2501, 
    description: 'The most important strategic base. It became a protected vassal of the Ming.',
    tradeExports: ['Silk Textiles', 'Porcelain', 'Iron'],
    tradeImports: ['Tin', 'Spices', 'Exotic Birds']
  },
  samudera: { 
    id: 'samudera', 
    name: 'Samudera Pasai', 
    chineseName: '苏门答剌', 
    lat: 5.1, 
    lng: 97.2, 
    description: 'A major Islamic sultanate where the fleet waited for the monsoon winds.',
    tradeExports: ['Gold Cloth', 'Silk'],
    tradeImports: ['Pepper', 'Sulfur', 'Camphor']
  },
  ceylon: { 
    id: 'ceylon', 
    name: 'Ceylon', 
    chineseName: '锡兰山', 
    lat: 6.47, 
    lng: 79.98, 
    description: 'Known for its gems and the sacred relic of the Buddha.',
    tradeExports: ['Silk', 'Gold/Silver Bullion'],
    tradeImports: ['Rubies', 'Sapphires', 'Pearls', 'Tea']
  },
  calicut: { 
    id: 'calicut', 
    name: 'Calicut', 
    chineseName: '古里', 
    lat: 11.2588, 
    lng: 75.7804, 
    description: 'The "City of Spices" on India\'s Malabar coast. A major destination.',
    tradeExports: ['Gold', 'Silver', 'Satin', 'Blue Porcelain'],
    tradeImports: ['Black Pepper', 'Cardamom', 'Ginger', 'Precious Stones']
  },
  ormuz: { 
    id: 'ormuz', 
    name: 'Hormuz', 
    chineseName: '忽鲁谟斯', 
    lat: 27.06, 
    lng: 56.46, 
    description: 'A wealthy port connecting the East to the Persian Empire.',
    tradeExports: ['Silk', 'Porcelain', 'Musk'],
    tradeImports: ['Arabian Horses', 'Silver', 'Jewels', 'Persian Carpets']
  },
  aden: { 
    id: 'aden', 
    name: 'Aden', 
    chineseName: '阿丹', 
    lat: 12.7855, 
    lng: 45.0186, 
    description: 'Gate to the Red Sea. The King of Aden sent a special giraffe as tribute.',
    tradeExports: ['Gold', 'Velvet'],
    tradeImports: ['Gems', 'Ambergris', 'Ostriches', 'Coral']
  },
  mogadishu: { 
    id: 'mogadishu', 
    name: 'Mogadishu', 
    chineseName: '木骨都束', 
    lat: 2.0469, 
    lng: 45.3182, 
    description: 'Reached in the 5th voyage. Encountered East African coastal civilizations.',
    tradeExports: ['Porcelain', 'Silk'],
    tradeImports: ['Ivory', 'Gold', 'Frankincense', 'Myrrh']
  },
  malindi: { 
    id: 'malindi', 
    name: 'Malindi', 
    chineseName: '麻林', 
    lat: -3.2192, 
    lng: 40.1169, 
    description: 'Famed for the 1414 gift of a giraffe, which was interpreted as a Qilin (mythical creature).',
    tradeExports: ['Silk', 'Ceramics'],
    tradeImports: ['Giraffes', 'Zebras', 'Ivory']
  },
  mecca: { 
    id: 'mecca', 
    name: 'Mecca', 
    chineseName: '天方', 
    lat: 21.4858, 
    lng: 39.1925, 
    description: 'Reached by a smaller fleet delegation. The holy city of Islam.',
    tradeExports: ['Silk', 'Porcelain'],
    tradeImports: ['Religious Texts', 'Perfumes', 'Incense']
  }
};

export const VOYAGES: Voyage[] = [
  {
    id: 1,
    title: 'First Voyage',
    chineseTitle: '第一次下西洋',
    years: '1405–1407',
    summary: 'The grand debut with 317 ships and 27,000 men. Traveled to Champa, Java, and Calicut.',
    path: ['liujiagang', 'champa', 'surabaya', 'palembang', 'malacca', 'samudera', 'ceylon', 'calicut'],
    color: '#ff4d4f'
  },
  {
    id: 2,
    title: 'Second Voyage',
    chineseTitle: '第二次下西洋',
    years: '1407–1409',
    summary: 'Investiture of the King of Calicut. Strengthened ties with Ceylon and Siam.',
    path: ['liujiagang', 'champa', 'surabaya', 'malacca', 'ceylon', 'calicut'],
    color: '#fa8c16'
  },
  {
    id: 3,
    title: 'Third Voyage',
    chineseTitle: '第三次下西洋',
    years: '1409–1411',
    summary: 'Focused on the Malabar coast and a conflict with the King of Kotte in Ceylon.',
    path: ['liujiagang', 'champa', 'surabaya', 'malacca', 'samudera', 'ceylon', 'calicut'],
    color: '#fadb14'
  },
  {
    id: 4,
    title: 'Fourth Voyage',
    chineseTitle: '第四次下西洋',
    years: '1413–1415',
    summary: 'First trip to the Persian Gulf. Reached Hormuz and received many foreign emissaries.',
    path: ['liujiagang', 'champa', 'surabaya', 'malacca', 'samudera', 'ceylon', 'calicut', 'ormuz'],
    color: '#52c41a'
  },
  {
    id: 5,
    title: 'Fifth Voyage',
    chineseTitle: '第五次下西洋',
    years: '1417–1419',
    summary: 'Exploration of East Africa. Exotic animals like giraffes were brought back to China.',
    path: ['liujiagang', 'champa', 'surabaya', 'malacca', 'samudera', 'ceylon', 'calicut', 'ormuz', 'aden', 'mogadishu', 'malindi'],
    color: '#13c2c2'
  },
  {
    id: 6,
    title: 'Sixth Voyage',
    chineseTitle: '第六次下西洋',
    years: '1421–1422',
    summary: 'Returned ambassadors from 36 countries. A relatively short expedition of 18 months.',
    path: ['liujiagang', 'champa', 'surabaya', 'malacca', 'samudera', 'ceylon', 'calicut', 'ormuz', 'aden', 'mogadishu'],
    color: '#1890ff'
  },
  {
    id: 7,
    title: 'Seventh Voyage',
    chineseTitle: '第七次下西洋',
    years: '1431–1433',
    summary: 'The final epic journey under the Xuande Emperor. Zheng He died at sea during this voyage.',
    path: ['liujiagang', 'champa', 'surabaya', 'palembang', 'malacca', 'samudera', 'ceylon', 'calicut', 'ormuz', 'aden', 'mecca'],
    color: '#722ed1'
  }
];
