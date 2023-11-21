import { html } from "../../node_modules/lit-html/lit-html.js";

const myTeamsTemplate = (allTeamsForCurrUser) => html`
<section id="my-teams">
    <article class="pad-med">
    <h1>My Teams</h1>
    ${allTeamsForCurrUser.length ? allTeamsForCurrUser.map(t => teamLayoutTemplate(t.team)) : noTeamsMemberTemplate()}
    </article>
</section>`;

const teamLayoutTemplate = (teamData) => html`
<article class="layout">
<img src=${teamData.logoUrl} class="team-logo left-col">
<div class="tm-preview">
    <h2>${teamData.name}</h2>
    <p>${teamData.description}</p>
    <span class="details">${teamData.membersCount} Members</span>
    <div><a href="/details/${teamData._id}" class="action">See details</a></div>
</div>
</article>`;

const noTeamsMemberTemplate = () => html`
<article class="layout narrow">
<div class="pad-med">
    <p>You are not a member of any team yet.</p>
    <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own team.</p>
</div>
<div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>`;

let _router = undefined;
let _render = undefined;
let _teamService = undefined;
let _memberService = undefined;


export function initialize(router, render, teamService, memberService) {
    _router = router;
    _render = render;
    _teamService = teamService;
    _memberService = memberService;

}

export async function myTeamsView(ctx){
    const user = ctx.user();
    const [allTeamsForCurrUser, membersData] = await Promise.all([_teamService.allTeamsForOneMember(user._id), _memberService.getAllMembers()]);
    allTeamsForCurrUser.forEach(t => t.team.membersCount = membersData.filter(member => member.teamId == t.teamId).length);
    _render(myTeamsTemplate(allTeamsForCurrUser));
}