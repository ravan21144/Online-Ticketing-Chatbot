const botName='Midas';
const sendButton=document.getElementById('sendButton');
const userInput=document.getElementById('messageUser');
const conversationDiv=document.getElementById('conversation');
let ticketId=0;
let adultTickets=0;
let childTickets=0;
let seniorTickets=0;
displayBotResponse(`Hello. I am ${botName}. It's nice to meet you. Your virtual assistant`);
let totalTickets=0;
let totalCost=0;
const cameraCost=200;
const costs={'adult': 20, 'child': 15, 'senior':10};
let language='';
function displayBotResponse(botResponse)
{
    const botResponseElement=document.createElement('ul');
    botResponseElement.textContent=`${botName}: ${botResponse}`;
    conversationDiv.appendChild(botResponseElement);
    conversationDiv.scrollTop=conversationDiv.scrollHeight;
}
function displayUserResponse(userResponse)
{
    const userResponseElement=document.createElement('ul');
    userResponseElement.textContent=`You: ${userResponse}`;
    conversationDiv.appendChild(userResponseElement);
    conversationDiv.scrollTop=conversationDiv.scrollHeight;
}
function displayList(listR)
{
    const listElement=document.createElement('ul');
    listElement.textContent=listR;
    conversationDiv.appendChild(listElement);
    conversationDiv.scrollTop=conversationDiv.scrollHeight;
}
sendButton.addEventListener('click',()=>
{
    const input=userInput.value;
    displayUserResponse(input);
    handleUserInput(input);
    userInput.value='';
});
userInput.addEventListener('keydown',(event)=>
{
    if(event.keyCode===13)
    {
        event.preventDefault();
        const input=userInput.value;
        displayUserResponse(input);
        handleUserInput(input);
        userInput.value='';
    }
});
let state='start1';
let x=0;
function handleUserInput(input)
{
    let inp=input.toLowerCase();
    switch(state)
    {
        case 'start1':
            displayBotResponse("Do you prefer english?");
        case 'start': 
        if(inp.includes('hi')===true || inp.includes('hello')===true)
        {
            displayBotResponse(`Hello. I am ${botName}. It's nice to meet you. Your virtual assistant`);
        }
        if(inp.includes('how are you'))
        {
            displayBotResponse(`I am fine. How can I help you today?`);
        }
        if(inp.includes('book') || inp.includes('ticket'))
        {
            state='book ticket';
            displayBotResponse(`Would you like to book a ticket? The prices are as below. What ticket would you like?`);
            displayList(`Adult: ${costs['adult']}`);
            displayList(`Child: ${costs['child']}`);
            displayList(`Senior: ${costs['senior']}`);
        }
        if(inp.includes('who are you'))
        {
            displayBotResponse(`Hello I am ${botName}. I am your personal assistant.`)
        }
        
        break;
        case 'book ticket':
            if(inp.includes('adult'))
            {
                state='adult';
                displayBotResponse(`How many adult tickets do you want?`);
            }
            if(inp.includes('child'))
            {
                state='child';
                displayBotResponse(`How many child tickets do you want?`);
            }
            if(inp.includes('senior'))
            {
                state='senior';
                displayBotResponse(`How many senior tickets do you want?`);
            }
            if(inp.includes('confirm')||inp.includes('ok')|| inp.includes('yes'))
            {
                state='camera';
                displayBotResponse('Would you like to carry a camera? (Confirm by typing either "Yes" or "No"');
            }
            if(inp==='cancel')
            {
                state='cancel';
                displayBotResponse(`Please enter what type of ticket would you like to cancel`);
            }
            if(inp.includes('cancel all'))
            {
                state='cancel all';
                displayBotResponse(`Are you sure that you want to cancel all the tickets?`);
            }
            break;
            case 'adult':
                state='book ticket';
                x=parseInt(input);
                totalTickets=totalTickets+x;
                adultTickets=adultTickets+x;
                totalCost=totalCost+x*20;
                displayBotResponse(`Net cost of the adult tickets is ${adultTickets*20} for ${adultTickets} tickets`);
                displayList(`Choose the next category of ticket that you want (type "confirm" to end the selection)`);
                displayList(`Type "cancel" to cancel few of the selected tickets`);
                displayList(`Type "cancel all" to cancel all the tickets`);
                break;
            case 'child':
                state='book ticket';
                x=parseInt(input);
                totalTickets=totalTickets+x;
                totalCost=totalCost+x*15;
                childTickets=childTickets+x;
                displayBotResponse(`Net cost of the child tickets is ${childTickets*15} for ${childTickets} tickets`);
                displayList(`Choose the next category of ticket that you want (type "confirm" to end the selection)`);
                displayList(`Type "cancel" to cancel few of the selected tickets`);
                displayList(`Type "cancel all" to cancel all the tickets`);
                break;
            case 'senior':
                state='book ticket';
                x=parseInt(input);
                totalTickets=totalTickets+x;
                seniorTickets=seniorTickets+x;
                totalCost=totalCost+x*10;
                displayBotResponse(`Net cost of the senior tickets is ${seniorTickets*10} for ${seniorTickets} tickets`);
                displayList(`Choose the next category of ticket that you want (type "confirm" to end the selection`);
                displayList(`Type "cancel" to cancel few of the selected tickets`);
                displayList(`Type "cancel all" to cancel all the tickets`);
                break;
            case 'camera':
                if(inp.includes('yes')||inp.includes('ok'))
                {
                    state='camera1';
                    displayBotResponse(`That would cost around ${cameraCost}. Would you like to confirm`);
                }
                if (inp.includes('no'))
                {
                    state='display';
                    displayBotResponse(`Would you like to move to billing?`);
                }
                break;
            case 'camera1':
                if(inp.includes('yes'))
                {
                    state='display'
                    totalCost=totalCost+cameraCost;
                    displayBotResponse(`Do you want to proceed to billing?`);
                }
                if(inp.includes('no'))
                {
                    state='display';
                    displayBotResponse(`Do you want to proceed to billing?`);
                }
                break;
                case 'display':
                    if(inp.includes('yes')|| inp.includes('ok'))
                    {
                        if(totalTickets!=0)
                        {
                           
                            displayBotResponse(`The total cost is ${totalCost} for ${totalTickets} tickets`);
                            displayBotResponse(`A ticket is generated for ${adultTickets} adults, ${childTickets} children and ${seniorTickets} senior citizens, with the ticket Id ${++ticketId}`);
                            totalCost=0;
                            totalTickets=0; adultTickets=0; childTickets=0; seniorTickets=0;
                        }
                        else
                        {
                            state='start';
                            displayBotResponse(`Sorry! You haven't booked any tickets. Please try again.`);
                        }
                    }
                    if(inp.includes(`no`))
                    {
                        state='start'
                        totalCost=0;
                        totalTickets=0; adultTickets=0; childTickets=0; seniorTickets=0;
                        displayBotResponse(`Your ticket has been cancelled. Thank you.`);
                    }
                    break;
                    case 'cancel':
                        if(inp.includes('adult'))
                        {
                            state='adultCancel';
                            displayBotResponse(`How many adult tickets would you like to cancel?`);
                        }
                        if(inp.includes('child'))
                        {
                            state='childCancel';
                            displayBotResponse(`How many child tickets would you like to cancel?`);
                        }
                        if(inp.includes(`senior`))
                        {
                            state='seniorCancel';
                            displayBotResponse(`How many senior tickets would you like to cancel?`);
                        }
                        if(inp.includes(`yes`))
                        {
                            state='cancel';
                            displayBotResponse(`What type of ticket would you like to cancel?`);
                            displayList(`Currently you have booked: `);
                            displayList(`${adultTickets} adult tickets, ${childTickets} child tickets and ${seniorTickets} senior tickets`);
                        }
                        if(inp.includes('no'))
                        {
                            state='camera';
                            displayBotResponse(`Would you like to carry a camera?`);
                        }
                        break;
                        case 'adultCancel':
                            x=parseInt(input);
                            if(x>adultTickets)
                            {
                                state='cancel';
                                displayBotResponse(`Sorry the number of tickets you have chosen to cancel are higher than those that you have booked.`);
                                displayList(`Please try again and choose the type of ticket that you want to cancel.`);
                            }
                            else
                            {
                                adultTickets=adultTickets-x;
                                totalTickets-=x;
                                displayBotResponse(`The new net cost for adult tickets is ${adultTickets*costs['adult']} for ${adultTickets} tickets`);
                                state='cancel'
                                displayBotResponse(`Would you like to cancel more tickets?`);
                            }
                            break;
                        case 'seniorCancel':
                            x=parseInt(input);
                            if(x>seniorTickets)
                            {
                                state='cancel';
                                displayBotResponse(`Sorry the number of tickets you have chosen to cancel are higher than those that you have booked.`);
                                displayList(`Please try again and choose the type of ticket that you want to cancel.`);
                            }
                            else
                            {
                                totalTickets-=x;
                                seniorTickets=seniorTickets-x;
                                displayBotResponse(`The new net cost for adult tickets is ${seniorTickets*costs['senior']} for ${seniorTickets} tickets`);
                                state='cancel'
                                displayBotResponse(`Would you like to cancel more tickets?`);
                            }
                            break;
                        case 'childCancel':
                            x=parseInt(input)
                            if(x>childTickets)
                                {
                                    state='cancel';
                                    displayBotResponse(`Sorry the number of tickets you have chosen to cancel are higher than those that you have booked.`);
                                    displayList(`Please try again and choose the type of ticket that you want to cancel.`);
                                }
                            else
                                {
                                    totalTickets-=x;
                                    childTickets=childTickets-x;
                                    displayBotResponse(`The new net cost for adult tickets is ${childTickets*costs['child']} for ${childTickets} tickets`);
                                    state='cancel'
                                    displayBotResponse(`Would you like to cancel more tickets?`);
                                }
                            break;
                            case 'cancel all':
                                if(inp.includes('yes'))
                                {
                                    state='start';
                                    totalTickets=0; adultTickets=0; seniorTickets=0; childTickets=0;
                                    totalCost=0;
                                    displayBotResponse('you have cancelled all tickets. Thank You. Please start again');
                                }
                                break;
                                

    }
}