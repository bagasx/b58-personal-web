class Testimonial {
  constructor(image, content, author, star) {
    this.image = image;
    this.content = content;
    this.author = author;
    this.star = star;
  }

  toHTML() {
    return `<div class="card">
          <img
            src="${this.image}"
            alt="author image"
          />
          <div class="content">
            <p><i>"${this.content}"</i></p>
          </div>
          <div class="author">
            <h4>- ${this.author}</h4>
          </div>
          <div class="star">
            <h4>${this.star} <i class="fa-solid fa-star fa-sm"></i></h4>
          </div>
        </div>`;
  }
}

const testimonials = [
  {
    image:
      "https://images.pexels.com/photos/4342400/pexels-photo-4342400.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "The service is the best",
    author: "Albert Hart",
    star: 4,
  },
  {
    image:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Provides clear and useful insight",
    author: "Bailey Pearson",
    star: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    content: "A little late in doing the work",
    author: "Jerry King",
    star: 3,
  },
  {
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Consectetur adipiscing elit",
    author: "Bailey Reeves",
    star: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/4342401/pexels-photo-4342401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Lorem ipsum dolor sit amet",
    author: "Michael Saylor",
    star: 4,
  },
];

let html = "";
for (let i = 0; i < testimonials.length; i++) {
  const { image, content, author, star } = testimonials[i];

  html += new Testimonial(image, content, author, star).toHTML();
}

document.getElementById("rating-card").innerHTML = html;
