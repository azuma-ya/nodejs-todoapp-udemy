const tasksDom = document.querySelector(".tasks");
const formDom = document.querySelector(".task-form");
const taskInputDom = document.querySelector(".task-input");
const formAlertDom = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //自作のapiをたたく
        const {data: tasks} = await axios.get("/api/v1/tasks");

        //タスクが一つもないとき
        if(tasks.length < 1) {
            tasksDom.innerHTML = `<5 class="empty-list">タスクがありません</h5>`;
            return;
        }

        //タスクの出力
        const allTasks = tasks.map((task) => {
            const {completed, _id, name} = task;

            return `<div class="single-task ${completed && "task-completed"}">
                        <h5>
                            <span><i class="far fa-check-circle"></i></span>${name}
                        </h5>
                        <div class="task-links">
                            <!-- 編集リンク -->
                            <a href="edit.html?id=${_id}" class="edit-link">
                                <i class="fas fa-edit"></i>
                            </a>
                            <!-- ゴミ箱リンク -->
                            <button type="button" class="delete-btn" data-id=${_id}>
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>`;
        }).join("");
        tasksDom.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

//タスクを新規作成
formDom.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = taskInputDom.value;
    try {
        await axios.post("/api/v1/tasks", {name: name})
        showTasks();
        taskInputDom.value = "";
        formAlertDom.style.display = "block";
        formAlertDom.innerHTML = "タスクを追加しました";
        formAlertDom.classList.add("text-success");
    } catch (err) {
        console.log(err);
        taskInputDom.value = "";
        formAlertDom.style.display = "block";
        formAlertDom.innerHTML = "無効です。もう一度やり直してください";
        formAlertDom.classList.remove("text-success");
    }
    setTimeout(() => {
        formAlertDom.style.display = "none";
    }, 3000);
});

//タスクを削除する
tasksDom.addEventListener("click", async (e) => {
    const element = e.target;
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
})
