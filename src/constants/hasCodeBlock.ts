export const hasCodeBlock = (content: string) => {
    const hasCodeBlock = content.includes("```");
    if (hasCodeBlock) {
      const data = content.replace(/```([\s\S]+?)```/g,"<pre className='ql-syntax bg-transparent' spellcheck='false'>$1</pre>");
      return data;
    }
    return "";
};