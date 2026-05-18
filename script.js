const API_KEY = "996980ab08e3d66b27c754a6c9969c04";

async function buatSoal(){

  const kategori =
    document.getElementById("kategori").value;

  const quiz =
    document.getElementById("quiz");

  quiz.innerHTML = "Sedang membuat soal...";

  const prompt = `
Buat 5 soal pilihan ganda tentang ${kategori}

Format JSON:

[
 {
  "pertanyaan":"...",
  "opsi":["A","B","C","D"],
  "jawaban":"A"
 }
]
`;

  const response = await fetch(
    "https://api.aimlapi.com/v1/chat/completions",
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + API_KEY
      },

      body:JSON.stringify({
        model:"gpt-4o",
        messages:[
          {
            role:"user",
            content:prompt
          }
        ]
      })
    }
  );

  const data = await response.json();

  let hasil =
    data.choices[0].message.content;

  hasil = hasil.replace(/```json/g,"");
  hasil = hasil.replace(/```/g,"");

  const soal = JSON.parse(hasil);

  quiz.innerHTML = "";

  soal.forEach((s,index)=>{

    const div =
      document.createElement("div");

    div.className = "question";

    let html =
      `<h3>${index+1}. ${s.pertanyaan}</h3>`;

    s.opsi.forEach((o,i)=>{

      const huruf =
        ["A","B","C","D"][i];

      html += `
        <p>${huruf}. ${o}</p>
      `;
    });

    div.innerHTML = html;

    quiz.appendChild(div);

  });

}