CREATE DEFINER=CURRENT_USER FUNCTION `insert_property_obj`(in_obj_id INT(10), in_pro_id INT(10), in_pro_value VARCHAR(255)) RETURNS tinyint(1)
BEGIN
  DECLARE r INT(2) DEFAULT 0;
	SELECT COUNT(OBJ_ID) INTO r FROM obj_pro WHERE OBJ_ID = in_obj_id AND PRO_ID = in_pro_id;
	IF (r>0) THEN 
		RETURN FALSE;
	ELSE 
		INSERT INTO obj_pro (OBJ_ID, PRO_ID, PRO_VALUE) VALUES (in_obj_id, in_pro_id, in_pro_value);
		RETURN TRUE;
	END IF;
END