function initializePage(item) {
    document.getElementById('itemId').value = item.id || '';
    document.getElementById('systemRole').value = 'As a seasoned appraiser specializing in pre-owned apparel, you possess extensive expertise in evaluating second-hand clothing and determining appropriate pricing strategies.';
    document.getElementById('prompt').value = `Your goal is to give me the resale value in USD of a specific item with the below characteristics, give an upper and lower bound. Conduct these four steps:

1. Scrape sold prices on the brand + category on platforms where we sell (Tradera, Vestiare, Grailed). Do a web search.
2. Find similar items based on the image I send you, take into account if it has defects
3. Give me a price range
4. Provide reasoning with why you set the span

Now execute step 1-4 to deliver the goal.

Characteristics:
- Original price: SEK ${item.originalPrice || '${originalPrice}'}
- Brand: ${item.cleanedBrand || '${cleanedBrand}'}
- Condition: ${item.condition || '${condition}'}
- Age: ${item.age || '${age}'}
- User comment: ${item.userComment || '${userComment}'}${item.defects ? `\n- Defects: ${item.defects}` : '\n- Defects: ${defects}'}${item.defectDescription ? `\n- Defects description: ${item.defectDescription}` : '\n- Defects description: ${defectDescription}'}
- Size: ${item.size || '${size}'}
- Material: ${item.material || '${material}'}
- Model: ${item.model || '${model}'}
- Color: ${item.color || '${color}'}
- Category: ${item.category || '${category}'}`;
}

function addEventListeners() {
    document.getElementById('runButton').addEventListener('click', async function () {
        // Collect form and call endpoint
        const res = await collectAndRun();
        if (res) {
            // Show result
            document.getElementById('result').innerText = 'RESULT HERE';
        }
    });

    let inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Add an event listener to each input to clear validation message on input
        input.addEventListener('input', (input) => {
            input.setCustomValidity(''); // Clear validation message
        });

        if (input.tagName.toLowerCase() === 'select') {
            input.addEventListener('change', () => {
                input.setCustomValidity('');
            });
        }
    });
}

async function validateInput() {
    return new Promise(resolve => {
        ['itemId', 'systemRole', 'prompt'].forEach(id => {
          const element = document.getElementById(id);
          element.setCustomValidity(element.value ? '' : 'Required');
        });

        const form = document.getElementById('promptForm');
        const formIsValid = !form.checkValidity();
            
        form.reportValidity();
        resolve(!formIsValid);
    });
}

async function collectAndRun() {
    if (!(await validateInput())) { return false }

    // Collect form data
    const body = {
        systemRole: document.getElementById('systemRole').value,
        prompt: document.getElementById('prompt').value
    };

    // Call endpoint
    console.log('Body: ', { body });
    const res = await callBackendApi(`/api/items/${itemId}/getValuation`, {
      data: { body },
      requiresAuth: false,
    });
    return { ...(res?.data || {}), id: itemId };
}

const getItem = async (itemId) => {
    const res = await callBackendApi(`/api/items/${itemId}`);
    return { ...(res?.data || {}), id: itemId };
}

const main = async () => {
    const params = getParamsObject();
    const item = params.id ? await getItem(params.id) : '';
    initializePage(item);
    addEventListeners();
}

main();
