const models = require("../models/index");
//show all
exports.index = async (req, res) => {
  const Foods = await models.Food.findAll({
    attributes: [ "id","name"],
    // include: [   // join
    //   {
    //     model: models.Group,
    //     as: "group",
    //     attributes: ["name", "detail"],
        
    //   },
    // ]
    // ,

    order: [["name", "desc"]],
  });

  res.status(200).json({
    data: Foods,
  });
};

//insert
exports.insert = async (req, res) => {
  try {
    const { name, detail, shop_name } = req.body;

    const existFoodname = await models.Food.findOne({ where: { name: name } });
    if (existFoodname) {
      const error = new Error(
        "รายการอาหารนี้มีในระบบอยู่แล้ว กรุณาเพิ่มรายการอาหารใหม่"
      );
      error.statusCode = 404;
      throw error; // to catch => error
    }

    const food = await models.Food.create({
      name: name,
      detail: detail,
      shop_name: shop_name,
    });

    res.status(201).json({
      message: "เพิ่มรายการอาหารเรียบร้อยแล้ว",
      data: {
        name: food.name,
        detail: food.detail,
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

//show one
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const Foods = await models.Food.findByPk(id);

    if (!Foods) {
      const error = new Error("ไม่พบรายการอาหารนี้");
      error.statusCode = 404;

      throw error; // to catch => error
    }
    res.status(200).json({
      data: Foods,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

//destroy
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await models.Food.findByPk(id);

    if (!food) {
      const error = new Error("ไม่มีรายการอาหารนี้");
      error.statusCode = 400;
      throw error; // to catch => error
    }

    //delete food
    await models.Food.destroy({
      where: { id: id },
    });

    res.status(200).json({
      message: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

//update
exports.update = async (req, res) => {
  try {
    const { id, name, detail, shop_name } = req.body;

    if (req.params.id !== id) {
      const error = new Error("รหัสผู้ใช้ไม่ถูกต้อง");
      error.statusCode = 400;
      throw error; // to catch => error
    }
    const food = await models.Food.update(
      {
        name: name,
        detail: detail,
        shop_name: shop_name,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

 
