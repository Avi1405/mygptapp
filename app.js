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

function buildFallbackMatches() {
  return Array.from({ length: 104 }, (_, idx) => {
    const matchNumber = idx + 1;
    const stage = stageForMatch(matchNumber);
    const teams = defaultTeams(matchNumber, stage);

    return {
      id: matchNumber,
      matchNumber,
      utcKickoff: defaultUtcKickoff(matchNumber),
      stage,
      homeTeam: teams.homeTeam,
      awayTeam: teams.awayTeam,
      stadium: 'Official FIFA venue (fallback)',
      city: 'TBD',
      country: 'Canada, Mexico, or United States',
      source: 'Fallback schedule generated locally (used only when canonical dataset fails to load)'
    };
  });
}

let matches = [];
let sourceVersionLabel = 'FIFA schedule v4 - Jan 14, 2026';

const countryCodeByTeam = {
  Mexico: 'MX',
  'South Africa': 'ZA',
  USA: 'US',
  Canada: 'CA'
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
    /^(\d[A-L]|[123][A-Z]+|Winner|Loser|Group|To be announced|TBD|W\d+|L\d+|\d)/i.test(team) ||
    team.includes('(') ||
    team.includes('#')
  ) {
    return null;
  }

  return team;
}

async function loadCanonicalSchedule() {
  try {
    const response = await fetch('data/fifa-2026-schedule.json');
    if (!response.ok) throw new Error(`Dataset request failed (${response.status})`);
    const payload = await response.json();
    const rawMatches = Array.isArray(payload?.matches) ? payload.matches : [];
    if (rawMatches.length !== 104) {
      throw new Error(`Expected 104 matches in dataset, found ${rawMatches.length}`);
    }

    sourceVersionLabel = payload.sourceVersion || sourceVersionLabel;

    return rawMatches
      .map((match) => ({
        id: Number(match.matchNumber),
        matchNumber: Number(match.matchNumber),
        utcKickoff: new Date(match.utcKickoff).toISOString(),
        stage: match.stage || stageForMatch(Number(match.matchNumber)),
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        stadium: match.stadium,
        city: match.city,
        country: match.country,
        source: match.source || sourceVersionLabel
      }))
      .sort((a, b) => a.matchNumber - b.matchNumber);
  } catch (error) {
    console.warn('Canonical dataset failed to load; using fallback schedule data:', error);
    return buildFallbackMatches();
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
    `Showing all 104 FIFA match numbers (1–104) from ${sourceVersionLabel}. Countries detected from scheduled teams (${participatingCountries.size}): ${sortedCountries.join(', ')}.`;
}

async function init() {
  matches = await loadCanonicalSchedule();
  buildCountryFilter();
  setupSeoSportsEvents();
  setupScheduleNote();

  countryFilter.addEventListener('change', renderSchedule);
  renderSchedule();
}

init();
