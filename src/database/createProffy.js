module.exports = async function(db, { proffyVelue, classValue, classScheduleValues }) {
    //inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUE (
            "${proffyVelue.name}",
            "${proffyVelue.avatar}",
            "${proffyVelue.whatsapp}",
            "${proffyVelue.bio}"
        );
    `)
 
    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUE (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //Inserir dados na tabela class_schededule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUE (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //aqui vou executar todos os db.runs() das class_schudules
    await Promise.all(insertedAllClassScheduleValues)
 }