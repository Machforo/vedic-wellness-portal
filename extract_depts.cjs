const fs = require('fs');
const path = require('path');

const files = [
  'AyurvedicSiddhanta.tsx', 'RachanaSharir.tsx', 'KriyaSharir.tsx', 'DravyagunaVigyana.tsx',
  'RasaShastra.tsx', 'Kaumarabhritya.tsx', 'PrasutiStriRoga.tsx', 'Kayachikitsa.tsx',
  'Panchkarma.tsx', 'ShalyaTantra.tsx', 'ShalakYaTantra.tsx', 'SwasthavrittaYoga.tsx',
  'AgadaTantra.tsx', 'SamhitaSanskrit.tsx'
];

const results = [];

files.forEach(f => {
  try {
    const content = fs.readFileSync(path.join('src/pages', f), 'utf8');
    
    // Use non-greedy match to get title and subtitle correctly
    const titleMatch = content.match(/title="([^"]+)"/);
    const subtitleMatch = content.match(/subtitle="([^"]+)"/);
    const imgMatch = content.match(/img src="([^"]+)"/);
    
    // Extract paragraphs. Only lines that have text-foreground/70 leading-relaxed
    const descMatches = [...content.matchAll(/<p className="text-foreground\/70 leading-relaxed"[^>]*>([\s\S]*?)<\/p>/g)];
    
    let highlights = [];
    const highlightsMatch = content.match(/const highlights = \[([\s\S]*?)\];/);
    if (highlightsMatch) {
      const hContent = highlightsMatch[1];
      const hItems = [...hContent.matchAll(/{[\s]*icon:[\s]*([^,]+),[\s]*title:[\s]*"([^"]+)",[\s]*description:[\s]*"([^"]+)"[\s]*}/g)];
      highlights = hItems.map(m => ({ icon: m[1].trim(), title: m[2].trim(), description: `<p>${m[3].trim()}</p>` }));
    }
    
    let description = descMatches.map(m => `<p>${m[1].trim()}</p>`).join('');
    
    let slug = f.replace('.tsx', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    // Special handling for ShalakYaTantra
    if (slug === 'shalak-ya-tantra') slug = 'shalakya-tantra';

    results.push({
      slug,
      name: titleMatch ? titleMatch[1] : f.replace('.tsx', ''),
      type: ['AyurvedicSiddhanta','RachanaSharir','KriyaSharir','DravyagunaVigyana','RasaShastra','SamhitaSanskrit','AgadaTantra'].includes(f.replace('.tsx', '')) ? 'Foundational' : 'Clinical',
      subtitle: subtitleMatch ? subtitleMatch[1] : '',
      description: description,
      image: imgMatch ? imgMatch[1] : '',
      highlights: highlights
    });
  } catch(e) {
    console.error('Error in ' + f + ': ' + e.message);
  }
});

fs.writeFileSync('../ishan-backend/departments_seed.json', JSON.stringify(results, null, 2));
console.log('Wrote to departments_seed.json');
