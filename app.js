const matches = [
  {
    id: 1,
    matchNumber: 1,
    utcKickoff: '2026-06-11T18:00:00Z',
    stage: 'Opening match',
    homeTeam: 'Mexico',
    awayTeam: 'South Africa',
    stadium: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'Mexico',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  {
    id: 2,
    matchNumber: 101,
    utcKickoff: '2026-07-14T19:00:00Z',
    stage: 'Semifinal',
    homeTeam: 'Winner QF1',
    awayTeam: 'Winner QF2',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  {
    id: 3,
    matchNumber: 102,
    utcKickoff: '2026-07-15T19:00:00Z',
    stage: 'Semifinal',
    homeTeam: 'Winner QF3',
    awayTeam: 'Winner QF4',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  {
    id: 4,
    matchNumber: 103,
    utcKickoff: '2026-07-18T20:00:00Z',
    stage: 'Third-place match',
    homeTeam: 'Loser SF1',
    awayTeam: 'Loser SF2',
    stadium: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  {
    id: 5,
    matchNumber: 104,
    utcKickoff: '2026-07-19T19:00:00Z',
    stage: 'Final',
    homeTeam: 'Winner SF1',
    awayTeam: 'Winner SF2',
    stadium: 'MetLife Stadium',
    city: 'New York/New Jersey',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  }
];

const countryCodeByTeam = {
  Mexico: 'MX',
  'South Africa': 'ZA',
  'Winner QF1': 'UN',
  'Winner QF2': 'UN',
  'Winner QF3': 'UN',
  'Winner QF4': 'UN',
  'Loser SF1': 'UN',
  'Loser SF2': 'UN',
  'Winner SF1': 'UN',
  'Winner SF2': 'UN'
};

const countryFilter = document.getElementById('country-filter');
const scheduleList = document.getElementById('schedule-list');
const scheduleEmpty = document.getElementById('schedule-empty');
const scheduleNote = document.getElementById('schedule-note');

function toFlagEmoji(code) {
  if (!code || code === 'UN') return '🏳️';
  return code
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
}

function getTeamLabel(team) {
  const flag = toFlagEmoji(countryCodeByTeam[team]);
  return `${flag} ${team}`;
}

function isCountryTeam(team) {
  return countryCodeByTeam[team] && countryCodeByTeam[team] !== 'UN';
}

function getLocalKickoff(utcString) {
  const date = new Date(utcString);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function buildMatchCard(match) {
  const article = document.createElement('article');
  article.className = 'match-card';

  article.innerHTML = `
    <h3 class="match-title">${getTeamLabel(match.homeTeam)} vs ${getTeamLabel(match.awayTeam)}</h3>
    <p class="match-meta"><strong>Match:</strong> #${match.matchNumber} · ${match.stage}</p>
    <p class="match-meta"><strong>Venue:</strong> ${match.stadium}, ${match.city}</p>
    <p class="match-kickoff">Kickoff: ${getLocalKickoff(match.utcKickoff)}</p>
  `;

  return article;
}

function renderSchedule() {
  const selected = countryFilter.value;
  const filtered =
    selected === 'all'
      ? matches
      : matches.filter((match) => match.homeTeam === selected || match.awayTeam === selected);

  scheduleList.innerHTML = '';
  if (!filtered.length) {
    scheduleEmpty.hidden = false;
    return;
  }

  scheduleEmpty.hidden = true;
  filtered.forEach((match) => scheduleList.appendChild(buildMatchCard(match)));
}

function buildCountryFilter() {
  const teams = new Set();
  matches.forEach((match) => {
    if (isCountryTeam(match.homeTeam)) teams.add(match.homeTeam);
    if (isCountryTeam(match.awayTeam)) teams.add(match.awayTeam);
  });

  [...teams].sort().forEach((team) => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = getTeamLabel(team);
    countryFilter.appendChild(option);
  });
}

function setupSeoSportsEvents() {
  const payload = {
    '@context': 'https://schema.org',
    '@graph': matches.map((match) => ({
      '@type': 'SportsEvent',
      name: `${match.homeTeam} vs ${match.awayTeam}`,
      description: `${match.stage} (Match ${match.matchNumber})`,
      startDate: match.utcKickoff,
      location: {
        '@type': 'Place',
        name: match.stadium,
        address: {
          '@type': 'PostalAddress',
          addressLocality: match.city,
          addressCountry: match.country
        }
      },
      competitor: [
        { '@type': 'SportsTeam', name: match.homeTeam },
        { '@type': 'SportsTeam', name: match.awayTeam }
      ],
      sport: 'Soccer'
    }))
  };

  document.getElementById('sports-events-jsonld').textContent = JSON.stringify(payload);
}

function setupScheduleNote() {
  scheduleNote.textContent =
    'Showing FIFA-verified anchor fixtures (opening match and knockout finals week) from the official Dec 6, 2025 schedule update.';
}

function init() {
  buildCountryFilter();
  setupSeoSportsEvents();
  setupScheduleNote();

  countryFilter.addEventListener('change', renderSchedule);
  renderSchedule();
}

init();
