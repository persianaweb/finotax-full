document.getElementById("submitQuiz").addEventListener("click", function () {
    let questions = document.querySelectorAll(".question-box");
    let correctAnswersCount = 0;
    let totalQuestions = questions.length;

    if (totalQuestions === 0) {
        console.log("هیچ سوالی پیدا نشد!");
        return;
    }

    questions.forEach((question, index) => {
        let selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        let explanationElements = question.querySelectorAll(".option-text");

        // مخفی کردن تمام توضیحات برای این سوال
        explanationElements.forEach(el => el.style.display = "none");

        if (selectedOption) {
            let correctAnswerIndex = selectedOption.getAttribute("data-correct");
            let selectedIndex = selectedOption.getAttribute("data-index");
            let labels = question.querySelectorAll(".option-label");

            labels.forEach((label, i) => {
                let input = label.querySelector("input");
                label.classList.remove("correct", "wrong");

                if (input.checked) {
                    if (input.value === correctAnswerIndex) {
                        label.classList.add("correct");
                        correctAnswersCount++;
                    } else {
                        label.classList.add("wrong");
                    }

                    // نمایش توضیح مربوط به گزینه انتخاب‌شده
                    let explanation = question.querySelector(`.option-text[data-index="${selectedIndex}"]`);
                    if (explanation) {
                        explanation.style.display = "block";
                    }
                }
            });
        }
    });

    let score = Math.round((correctAnswersCount / totalQuestions) * 100);
    document.getElementById("quizScore").innerHTML = `نمره شما: ${score} از 100 (${correctAnswersCount} پاسخ صحیح از ${totalQuestions} سوال)`;

    console.log("USER_ID:", USER_ID);
    console.log("ARTICLE_ID:", ARTICLE_ID);

    // ارسال نمره به سرور
    fetch("/module/save-quiz-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: USER_ID,
            articleId: ARTICLE_ID,
            score: score,
            correctAnswers: correctAnswersCount,
            totalQuestions: totalQuestions
        })
    })
        .then(response => response.json())
        .then(data => console.log("نتیجه آزمون ذخیره شد:", data))
        .catch(error => console.error("خطا در ذخیره نتیجه آزمون:", error));
});
