import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = (teamData, userMembershipId, members, removeMember, userStatus, joinHandler, pending, approvePending, user) => html`
<section id="team-home">
<article class="layout">
    <img src=${teamData.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${teamData.name}</h2>
        <p>${teamData.description}</p>
        <span class="details">${members.length} Members</span>
        ${userStatus == 'owner' ? html`<div><a href="/edit/${teamData._id}" class="action">Edit team</a></div>` : nothing}
        ${userStatus == 'nonMember' ? html`<div><a href="javascript:void(0)" class="action" @click=${() => joinHandler(teamData._id)}>Join team</a></div>` : nothing}
        ${userStatus == 'pending' ? html`<div>Membership pending.<a href="javascript:void(0)" @click=${() => removeMember(userMembershipId, teamData._id)}>Cancel request</a></div>` : nothing}
        ${userStatus == 'member' ? html`<div><a href="javascript:void(0)" class="action invert" @click=${() => removeMember(userMembershipId, teamData._id)}>Leave team</a></div>` : nothing} 
        ${membersTemplate(members, userStatus, removeMember, user)}
        ${userStatus == 'owner' ? pendingMembershipsTemplate(pending, approvePending, removeMember) : nothing}
    </div>
</article >
</section > `;

const membersTemplate = (members, userStatus, removeMember, user) => html`
<div class="pad-large">
<h3>Members</h3>
<ul class="tm-members">
    ${members.map(member => html`
    <li>${member.user.username}
        ${userStatus == 'owner' && member.user._id != user._id ? html`
        <a href="javascript:void(0)" class="tm-control action" @click=${() => removeMember(member._id, member.teamId)}>Remove from team</a>`
        : nothing}
    </li>`)}
</ul>
</div > `;

const pendingMembershipsTemplate = (pending, approvePending, removeMember) => html`
<h3>Membership Requests</h3>
<ul class="tm-members">
    ${pending.map(p => html`<li>${p.user.username} 
    <a href="javascript:void(0)" class="tm-control action" @click=${() => approvePending(p)}>Approve</a>
    <a href="javascript:void(0)" class="tm-control action" @click=${() => removeMember(p._id, p.teamId)}>Decline</a>
    </li>`)}
</ul>`;

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

export async function detailsView(ctx) {
    const [teamData, allMemberships] = await Promise.all([
        _teamService.getItemById(ctx.params.id),
        _memberService.getTeamMembers(ctx.params.id)]);
    const user = ctx.user();
    let userStatus = undefined;
    let userMembershipId = undefined;

    if (user && teamData._ownerId == user._id) {
        userStatus = 'owner'
    } else if (user) {
        let membership = allMemberships.find(m => m._ownerId == user._id);
        if (!membership) {
            userStatus = 'nonMember';
        } else if (membership.status == 'pending') {
            userMembershipId = membership._id;
            userStatus = 'pending';
        } else if (membership.status == 'member') {
            userMembershipId = membership._id;
            userStatus = 'member';
        }
    }

    const members = allMemberships.filter(m => m.status == 'member');
    const pending = allMemberships.filter(m => m.status == 'pending');

    _render(detailsTemplate(teamData, userMembershipId, members, removeMember, userStatus, joinHandler, pending, approvePending, user));
}

async function removeMember(memberId, teamId) {
    if (confirm('Do you confirm the changes?')) {
        await _memberService.deleteRequest(memberId);
        _router.redirect(`/details/${teamId}`);
    }
}

async function joinHandler(teamId) {
    await _memberService.joinTeam({ teamId });
    _router.redirect(`/details/${teamId}`);
}

async function approvePending(pendingMember) {
    const pendingMemberId = pendingMember._id;
    pendingMember.status = 'member';
    await _memberService.approve(pendingMemberId, pendingMember);
    _router.redirect(`/details/${pendingMember.teamId}`);
}