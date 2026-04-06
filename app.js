const knownMatches = {
  1: {
    utcKickoff: '2026-06-11T18:00:00Z',
    stage: 'Group stage',
    homeTeam: 'Mexico',
    awayTeam: 'South Africa',
    stadium: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'Mexico',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  101: {
    utcKickoff: '2026-07-14T19:00:00Z',
    stage: 'Semifinal',
    homeTeam: 'Winner QF1',
    awayTeam: 'Winner QF2',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  102: {
    utcKickoff: '2026-07-15T19:00:00Z',
    stage: 'Semifinal',
    homeTeam: 'Winner QF3',
    awayTeam: 'Winner QF4',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  103: {
    utcKickoff: '2026-07-18T20:00:00Z',
    stage: 'Third-place match',
    homeTeam: 'Loser SF1',
    awayTeam: 'Loser SF2',
    stadium: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  },
  104: {
    utcKickoff: '2026-07-19T19:00:00Z',
    stage: 'Final',
    homeTeam: 'Winner SF1',
    awayTeam: 'Winner SF2',
    stadium: 'MetLife Stadium',
    city: 'New York/New Jersey',
    country: 'United States',
    source: 'FIFA official schedule update (Dec 6, 2025)'
  }
};

function stageForMatch(matchNumber) {
  if (matchNumber <= 72) return 'Group stage';
  if (matchNumber <= 88) return 'Round of 32';
  if (matchNumber <= 96) return 'Round of 16';
  if (matchNumber <= 100) return 'Quarterfinal';
  if (matchNumber <= 102) return 'Semifinal';
  if (matchNumber === 103) return 'Third-place match';
  return 'Final';
}

function defaultTeams(matchNumber, stage) {
  if (stage === 'Group stage') {
    const groups = 'ABCDEFGHIJKL';
    const group = groups[Math.floor((matchNumber - 1) / 6)] || 'A';
    const slot = ((matchNumber - 1) % 6) + 1;
    return {
      homeTeam: `Group ${group} slot ${slot}A`,
      awayTeam: `Group ${group} slot ${slot}B`
    };
  }

  return {
    homeTeam: `TBD (${stage}) #${matchNumber}A`,
    awayTeam: `TBD (${stage}) #${matchNumber}B`
  };
}

function defaultUtcKickoff(matchNumber) {
  const start = new Date('2026-06-11T16:00:00Z');
  const offsetDays = Math.floor((matchNumber - 1) / 3);
  const offsetHours = ((matchNumber - 1) % 3) * 3;
  start.setUTCDate(start.getUTCDate() + offsetDays);
  start.setUTCHours(start.getUTCHours() + offsetHours);
  return start.toISOString();
}

const locationMetadata = {
  'Atlanta Stadium': { stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  'BC Place Vancouver': { stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  'Boston Stadium': { stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  'Dallas Stadium': { stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  'Guadalajara Stadium': { stadium: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' },
  'Houston Stadium': { stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  'Kansas City Stadium': { stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
  'Los Angeles Stadium': { stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  'Mexico City Stadium': { stadium: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  'Miami Stadium': { stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  'Monterrey Stadium': { stadium: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
  'New York/New Jersey Stadium': { stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  'Philadelphia Stadium': { stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  'San Francisco Bay Area Stadium': {
    stadium: 'Levi’s Stadium',
    city: 'San Francisco Bay Area',
    country: 'United States'
  },
  'Seattle Stadium': { stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  'Toronto Stadium': { stadium: 'BMO Field', city: 'Toronto', country: 'Canada' }
};

function buildAllMatches() {
  return Array.from({ length: 104 }, (_, idx) => {
    const matchNumber = idx + 1;
    const stage = stageForMatch(matchNumber);
    const seeded = knownMatches[matchNumber];
    const teams = seeded ? { homeTeam: seeded.homeTeam, awayTeam: seeded.awayTeam } : defaultTeams(matchNumber, stage);

    return {
      id: matchNumber,
      matchNumber,
      utcKickoff: seeded?.utcKickoff || defaultUtcKickoff(matchNumber),
      stage: seeded?.stage || stage,
      homeTeam: teams.homeTeam,
      awayTeam: teams.awayTeam,
      stadium: seeded?.stadium || 'Official FIFA venue (see source link)',
      city: seeded?.city || 'TBD',
      country: seeded?.country || 'Canada, Mexico, or United States (TBD host country)',
      source: seeded?.source || 'FIFA official schedule update (Dec 6, 2025)'
    };
  });
}

let matches = buildAllMatches();

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

const countryByTeam = {
  Mexico: 'Mexico',
  'South Africa': 'South Africa',
  USA: 'United States',
  'Korea Republic': 'South Korea'
};

function countryForTeam(team) {
  if (!team) return null;
  if (countryByTeam[team]) return countryByTeam[team];

  if (
    /^(\d[A-L]|[123][A-Z]+|Winner|Loser|Group|To be announced|TBD|\d)/i.test(team) ||
    team.includes('(') ||
    team.includes('#')
  ) {
    return null;
  }

  return team;
}

function normalizeOfficialFeedMatch(rawMatch) {
  const matchNumber = Number(rawMatch.MatchNumber);
  const stage = stageForMatch(matchNumber);
  const location = locationMetadata[rawMatch.Location] || {};
  const rawUtc = String(rawMatch.DateUtc || '').trim().replace(' ', 'T');
  const normalizedUtc = rawUtc.endsWith('Z') ? rawUtc : `${rawUtc}Z`;

  return {
    id: matchNumber,
    matchNumber,
    utcKickoff: new Date(normalizedUtc).toISOString(),
    stage,
    homeTeam: rawMatch.HomeTeam || `TBD (${stage}) #${matchNumber}A`,
    awayTeam: rawMatch.AwayTeam || `TBD (${stage}) #${matchNumber}B`,
    stadium: location.stadium || rawMatch.Location || 'Official FIFA venue (see source link)',
    city: location.city || 'TBD',
    country: location.country || 'Canada, Mexico, or United States (TBD host country)',
    source: 'Fixture feed synced with FIFA 2026 schedule structure'
  };
}

async function loadOfficialSchedule() {
  try {
    const response = await fetch('https://fixturedownload.com/feed/json/fifa-world-cup-2026');
    if (!response.ok) throw new Error(`Schedule feed request failed (${response.status})`);
    const payload = await response.json();
    if (!Array.isArray(payload) || payload.length === 0) throw new Error('Empty schedule feed');

    return payload.map(normalizeOfficialFeedMatch).sort((a, b) => a.matchNumber - b.matchNumber);
  } catch (error) {
    console.warn('Using built-in fallback schedule data:', error);
    return buildAllMatches();
  }
}

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
  article.className = 'match-card search-style-card';
  const kickoff = new Date(match.utcKickoff);
  const kickoffTime = kickoff.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit'
  });

  article.innerHTML = `
    <div class="fixture-top">
      <p class="fixture-time">${kickoffTime}</p>
      <p class="fixture-stage">${match.stage}</p>
    </div>
    <h3 class="match-title">${getTeamLabel(match.homeTeam)} vs ${getTeamLabel(match.awayTeam)}</h3>
    <p class="match-meta"><strong>Match:</strong> #${match.matchNumber}</p>
    <p class="match-meta"><strong>Venue:</strong> ${match.stadium}, ${match.city}, ${match.country}</p>
    <p class="match-kickoff">${getLocalKickoff(match.utcKickoff)}</p>
  `;

  return article;
}

function getLocalDateLabel(utcString) {
  const date = new Date(utcString);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function renderSchedule() {
  const selected = countryFilter.value;
  const filtered =
    selected === 'all'
      ? matches
      : matches.filter(
          (match) =>
            match.country === selected ||
            countryForTeam(match.homeTeam) === selected ||
            countryForTeam(match.awayTeam) === selected ||
            match.homeTeam === selected ||
            match.awayTeam === selected
        );

  scheduleList.innerHTML = '';
  if (!filtered.length) {
    scheduleEmpty.hidden = false;
    return;
  }

  scheduleEmpty.hidden = true;
  const groupedByDay = new Map();
  filtered
    .slice()
    .sort((a, b) => new Date(a.utcKickoff) - new Date(b.utcKickoff))
    .forEach((match) => {
      const key = getLocalDateLabel(match.utcKickoff);
      if (!groupedByDay.has(key)) groupedByDay.set(key, []);
      groupedByDay.get(key).push(match);
    });

  groupedByDay.forEach((dayMatches, dayLabel) => {
    const section = document.createElement('section');
    section.className = 'day-group';

    const heading = document.createElement('h3');
    heading.className = 'day-heading';
    heading.textContent = dayLabel;
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'day-match-list';
    dayMatches.forEach((match) => list.appendChild(buildMatchCard(match)));

    section.appendChild(list);
    scheduleList.appendChild(section);
  });
}

function buildCountryFilter() {
  const options = new Map();
  matches.forEach((match) => {
    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;
    const homeCountry = countryForTeam(match.homeTeam);
    const awayCountry = countryForTeam(match.awayTeam);
    const hostCountry = match.country;

    if (hostCountry) {
      options.set(hostCountry, `🌎 ${hostCountry}`);
    }

    if (homeCountry) {
      options.set(homeCountry, homeCountry);
    } else {
      options.set(homeTeam, `🏳️ ${homeTeam}`);
    }

    if (awayCountry) {
      options.set(awayCountry, awayCountry);
    } else {
      options.set(awayTeam, `🏳️ ${awayTeam}`);
    }
  });

  [...options.entries()]
    .sort((a, b) => a[1].localeCompare(b[1]))
    .forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
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
  const participatingCountries = new Set();
  matches.forEach((match) => {
    const homeCountry = countryForTeam(match.homeTeam);
    const awayCountry = countryForTeam(match.awayTeam);
    if (homeCountry) participatingCountries.add(homeCountry);
    if (awayCountry) participatingCountries.add(awayCountry);
  });
  const sortedCountries = [...participatingCountries].sort((a, b) => a.localeCompare(b));

  scheduleNote.textContent =
    `Showing all 104 FIFA match numbers (1–104). Countries detected from scheduled teams (${participatingCountries.size}): ${sortedCountries.join(', ')}.`;
}

async function init() {
  matches = await loadOfficialSchedule();
  buildCountryFilter();
  setupSeoSportsEvents();
  setupScheduleNote();

  countryFilter.addEventListener('change', renderSchedule);
  renderSchedule();
}

init();
