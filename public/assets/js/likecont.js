const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

const submitForm = async (element, postId, action) => {
  const likesCountElement = document.getElementById("likesCount");
  const dislikesCountElement = document.getElementById("dislikesCount");

  try {
    const headers = new Headers({
      "content-type": "application/json",
      "X-CSRF-Token": csrfToken,
    });
    const body = JSON.stringify({ action: action });

    let response = await fetch(`/posts/${postId}/${action}?_method=put`, {
      headers: headers,
      body: body,
      method: "PUT",
    });

    if (response.ok) {
      const data = await response.json();

      if (data.message === "Post Liked Success") {
        element.checked = true;
        likesCountElement.textContent = data.likesCount;
        dislikesCountElement.textContent = data.dislikeCount;
        likesCountElement.classList.add('like')
        dislikesCountElement.classList.add('dislike')
        const otherCheckboxId = element.id === "likeCheckbox" ? "dislikeCheckbox" : "likeCheckbox";
        const otherCheckbox = document.getElementById(otherCheckboxId);

        if (otherCheckbox && otherCheckbox.checked) {
          otherCheckbox.checked = false;
        }
      } else if (data.message === "User disliked this post") {
        element.checked = true;
        dislikesCountElement.textContent = data.dislikeCount;
        likesCountElement.textContent = data.likesCount;
        const otherCheckboxId = element.id === "likeCheckbox" ? "dislikeCheckbox" : "likeCheckbox";
        const otherCheckbox = document.getElementById(otherCheckboxId);

        if (otherCheckbox && otherCheckbox.checked) {
          otherCheckbox.checked = false;
        }
      } else {
        console.error(
          "Erro ao processar a resposta do servidor:",
          data.message
        );
      }
    } else {
      console.error("Erro na requisição:", response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};
