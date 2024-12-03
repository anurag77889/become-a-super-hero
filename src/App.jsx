import { useState } from "react";

function App() {
  // State to hold form Inputs
  const [formData, setFormData] = useState({
    superheroName: "",
    realName: "",
    email: "",
    superpowers: [],
    weakness: "",
    profilePicture: null,
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedPowers = checked
      ? [...formData.superpowers, value]
      : formData.superpowers.filter((power) => power !== value);

    setFormData({ ...formData, superpowers: updatedPowers });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted: ", formData);
      alert("Congratulations! Marvel or DC may call you anytime soon..");
    } else {
      alert("You can't be a superhero without being honest.");
    }
  };

  // Handling Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.superheroName.trim()) {
      errors.superheroName = "You don't like superheroes? Come on!";
    }
    if (!formData.realName.trim()) {
      errors.realName = `So you're a robot or what?`;
    }
    if (!formData.email.trim()) {
      errors.email = "I'm not Mark Zuckerberg!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Don't fake it or else you'll become Thanos";
    }
    if (formData.superpowers.length === 0) {
      errors.superpowers = "So you don't want your Ex back using Time Travel";
    }
    if (!formData.weakness) {
      errors.weakness = "I bet you're this perfect!";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-700 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          !! Register Yourself as a Superhero !!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="superheroName"
              className="block text-white font-semibold pb-2"
            >
              Superhero Name
            </label>
            <input
              type="text"
              id="superheroName"
              name="superheroName"
              value={formData.superheroName}
              onChange={handleChange}
              placeholder="Iron Man or Super Man? Aha!"
              className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.superheroName
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400"
              }`}
            />
            {formErrors.superheroName && (
              <p className="text-red-500 text-sm mt-1"></p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="realName"
              className="block text-white font-semibold pb-2"
            >
              Real Name
            </label>
            <input
              type="text"
              id="realName"
              name="realName"
              value={formData.realName}
              onChange={handleChange}
              placeholder="Rishika or Shreyas? Uhh!"
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white font-semibold pb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Don't Worry! Not Selling it to Facebook"
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold pb-2">
              Superpowers
            </label>
            <div className="flex flex-wrap gap-2 flex-col">
              {[
                "Flying",
                "Invisibility",
                "Super Strength",
                "Telepathy",
                "Time Travel",
              ].map((power) => (
                <label
                  key={power}
                  className="ms-2 text-base font-medium text-white dark:text-white"
                >
                  <input
                    type="checkbox"
                    value={power}
                    checked={formData.superpowers.includes(power)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {power}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="weakness"
              className="block text-white font-semibold pb-2"
            >
              Weakness
            </label>
            <select
              name="weakness"
              id="weakness"
              value={formData.weakness}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Nobody is perfect ! So?</option>
              <option value="Kryptonite">Kryptonite</option>
              <option value="Sunlight">Sunlight</option>
              <option value="Water">Water</option>
              <option value="Loud Noises">Loud Noises</option>
              <option value="Overconfidence">Overconfidence</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-white font-semibold pb-2"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
