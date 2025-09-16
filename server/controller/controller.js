const Drugdb = require("../model/model");

// ---------------- VALIDATE ----------------
exports.validateDrug = (req, res, next) => {
  const { name, dosage, card, pack, perDay } = req.body;

  if (!name || name.length <= 5) {
    return res.status(400).send({ message: "❌ Name dài hơn 5 ký tự" });
  }

  const dosageRegex = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
  if (!dosageRegex.test(dosage)) {
    return res.status(400).send({
      message: "❌ Dosage sai định dạng (VD: 10-morning,20-afternoon,30-night)",
    });
  }

  if (card <= 1000) {
    return res.status(400).send({ message: "❌ Card  > 1000" });
  }

  if (pack <= 0) {
    return res.status(400).send({ message: "❌ Pack > 0" });
  }

  if (perDay <= 0 || perDay >= 90) {
    return res.status(400).send({ message: "❌ PerDay > 0 và < 90" });
  }

  next();
};

// ---------------- CREATE ----------------
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const drug = new Drugdb(req.body);

  drug
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || "Error adding drug" })
    );
};

// ---------------- FIND ----------------
exports.find = (req, res) => {
  if (req.query.id) {
    Drugdb.findById(req.query.id)
      .then((data) =>
        data ? res.send(data) : res.status(404).send({ message: "Not found" })
      )
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    Drugdb.find()
      .then((drug) => res.send(drug))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

// ---------------- UPDATE ----------------
exports.update = (req, res) => {
  if (!req.body)
    return res.status(400).send({ message: "Data cannot be empty" });

  Drugdb.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) =>
      data ? res.send(data) : res.status(404).send({ message: "Not found" })
    )
    .catch((err) => res.status(500).send({ message: err.message }));
};

// ---------------- DELETE ----------------
exports.delete = (req, res) => {
  Drugdb.findByIdAndDelete(req.params.id)
    .then((data) =>
      data
        ? res.send({ message: "✅ Deleted successfully" })
        : res.status(404).send({ message: "Not found" })
    )
    .catch((err) => res.status(500).send({ message: err.message }));
};

// ---------------- PURCHASE ----------------
exports.purchase = async (req, res) => {
  try {
    const { quantity } = req.body;
    const drug = await Drugdb.findById(req.params.id);

    if (!drug) return res.status(404).send({ message: "Drug not found" });
    if (quantity <= 0) return res.status(400).send({ message: "Quantity > 0" });
    if (drug.pack < quantity)
      return res
        .status(400)
        .send({ message: "Không đủ số lượng thuốc trong kho" });

    drug.pack -= quantity;
    await drug.save();

    res.send({ message: "Đặt mua thành công", drug });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
