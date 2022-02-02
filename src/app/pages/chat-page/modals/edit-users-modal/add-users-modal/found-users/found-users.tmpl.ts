export const foundUsersTmpl = `
    {{#each foundUsers}}
        <div id="{{ id }}" class="found-user-card">
            <div class="found-user-card__info"> 
                <div class="found-user-card__avatar">
                    {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{ avatar }}" alt="">
                    {{/if}}
                </div>
                
                <div>
                    <div class="found-user-card__name">{{ first_name }} {{ second_name }}</div>
                    <div class="found-user-card__login">{{ login }}</div>
                </div>
            </div>
            
            <div id="chat-add-user-icon" class="found-user-card__add-user"></div>
        </div>
    {{else}}
        <div class="found-users__not-found">Users not found</div>
    {{/each}}
`;
