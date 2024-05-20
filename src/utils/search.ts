/** 스트링의 html 태그 제거 */
export const deleteTagTitle = (title: string) => {
    const newTitle = title
        .replace(/<\/?b>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ");

    return newTitle;
}