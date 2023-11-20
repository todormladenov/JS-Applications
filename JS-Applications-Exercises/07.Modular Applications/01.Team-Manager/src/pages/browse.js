import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const browseTemplate = (teamsData, user) => html`
<section id="browse">
<article class="pad-med">
    <h1>Team Browser</h1>
</article>
${user ? createBtnTemplate() : nothing}
${teamsData.map(team => teamLayoutTemplate(team))}
</section>`;

export const createBtnTemplate = () => html`
<article class="layout narrow">
    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>`

export const teamLayoutTemplate = (teamData, membersData) => html`
<article class="layout">
<img src=${teamData.logoUrl} class="team-logo left-col">
<div class="tm-preview">
    <h2>${teamData.name}</h2>
    <p>${teamData.description}</p>
    <span class="details">${teamData.membersCount} Members</span>
    <div><a href="/details/${teamData._id}" class="action">See details</a></div>
</div>
</article>`;

let _router = undefined;
let _render = undefined;
let _teamService = undefined;
let _memberService = undefined;

export function initialize(router, render, teamService, memberService){
    _router = router;
    _render = render;
    _teamService = teamService;
    _memberService = memberService;
}

export async function browseView(ctx) {
    const [teamsData, membersData] = await Promise.all([_teamService.getAllItems(), _memberService.getAllMembers()]);
    const user = ctx.user();
    teamsData.forEach(team => team.membersCount = membersData.filter(member => member.teamId == team._id).length);
    _render(browseTemplate(teamsData, user));
}