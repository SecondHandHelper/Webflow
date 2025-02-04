function initializePage(item) {
    document.getElementById('itemId').value = item.id || 'tsFDKftTtL';
    document.getElementById('systemRole').value = 'You are an expert at valuating second hand apparel and setting prices';
    document.getElementById('prompt').value = `Your goal is to give me the resale value in USD of a specific item with the below characteristics, give an upper and lower bound. Conduct these four steps:

1. Scrape sold prices on the brand + category on platforms where we sell (Tradera, Vestiare, Grailed). Do a web search.
2. Find similar items based on the image I send you, take into account if it has defects
3. Give me a price range
4. Provide reasoning with why you set the span

Now execute step 1-4 to deliver the goal.

Characteristics:
- Orignal price: ${item.originalPrice}
- Brand: ${item.cleanedBrand}
- Condition: ${item.condition}
- Age: ${item.age}
- User comment: ${item.userComment}
- Defects: ${item.defects}
- Defect description: ${item.defectDescription}
- Size: ${item.size}
- Material: ${item.material}
- Model: ${item.model}
- Color: ${item.color}
- Category: ${item.category}`;
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

        const formIsValid = !document.getElementById('formInner')
            .checkValidity();
            
        document.getElementById('formInner').reportValidity();
        resolve(!formIsValid);
    });
}

async function collectAndRun() {
    if (!(await validateInput())) { return false }

    // Collect form data
    const body = {
        itemId: document.getElementById('itemId').value,
        systemRole: document.getElementById('systemRole').value,
        prompt: document.getElementById('prompt').value
    };

    // Call endpoint
    console.log('Body: ', { itemId, body });
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
    if (!item) {
        console.error("Invalid item id param");
        location.href = '/';
    }
    initializePage(item);
    addEventListeners();
}

main();
