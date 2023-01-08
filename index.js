window.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const addBtn = document.getElementById('add-btn');
    let tablerowsCount = (table.rows.length) - 1;

    const onSubmit = (ev) => {
        ev.preventDefault();
        const form = document.forms.form;
        const formData = Object.fromEntries(new FormData(form).entries());

        const sendData = () => {
            fetch('/index.php', {
                method: 'POST',
                body: JSON.stringify(formData) 
            })
            .catch(e => alert('Ошибка! ', e))
            .then(res => {
                res.json();
                alert('Данные отправлены!');
            })
        }
        
        Object.values(formData).some(field => field === '') 
            ? alert('Все поля должны быть заполены!') 
            : sendData();

        console.log(JSON.stringify(formData));
    }

    submitBtn.addEventListener('click', onSubmit);
    addBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const table = document.getElementById('table');
        const tableRow = document.createElement('tr');

        const elemetnts = [
            { el: `<input required type="text" name="name_${tablerowsCount}" id="name" />` },
            { el: `<select required name="position_${tablerowsCount}">
                        <option>Аналитик</option>
                        <option>Менеджер</option>
                        <option>Программист</option>
                        <option>Юрист</option>
                    </select>` },
            { el: `<input type="number" required name="age_${tablerowsCount}" id="age" />` },
            { el: `<textarea name="competencies${tablerowsCount}" required class="table__comment-input"></textarea>` },
            { el: `<button class="delete-btn" type="button" data-index="${tablerowsCount + 1}">Удалить</button>` },
        ];

        elemetnts.forEach(element => {
            const tableColumn = document.createElement('td');
            tableColumn.classList.add('table__column');
            tableColumn.insertAdjacentHTML('afterbegin', element.el);
            tableRow.appendChild(tableColumn);
        })

        table.tBodies[0].appendChild(tableRow);
        tablerowsCount = table.rows.length - 1;

    });

    table.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON') {
            table.deleteRow(ev.target.dataset.index);
            tablerowsCount = table.rows.length - 1;
        }
    });
});