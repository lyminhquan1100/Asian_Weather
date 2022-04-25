package com.vti.utils;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;


/**
 * This class JwtUtil.
 * 
 * @Description: .
 * @author: Đinh Huy Khánh
 * @create_date: 3/5/2021
 * @version: 1.0
 * @modifer: 
 * @modifer_date: 
 */	
@Service
public class JwtUtil implements Serializable {

	 private static Logger logger = LoggerFactory.getLogger(JwtUtil.class);
	    private String SECRET_KEY = "secret";

	    private static final long serialVersionUID = 1L;

	    private static final long JWT_TOKEN_VALIDITY = 60 * 60;

	    /*   lấy tên người dùng từ mã thông báo jwt */
	    public String extractUsername(String token) {
	        return extractClaim(token, Claims::getSubject);
	    }

	    /* lấy ngày hết hạn từ mã thông báo jwt */
	    public Date extractExpiration(String token) {
	        return extractClaim(token, Claims::getExpiration);
	    }


	    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        final Claims claims = extractAllClaims(token);
	        try {
	            return claimsResolver.apply(claims);
	        } catch (Exception e) {
//	            throw new JwtException("ExpiredJwtException");
	            logger.error(e.getMessage() + ": ExpiredJwtException");
	            return null;
	        }
	    }

	    // Khi muốn lấy bất kì thông tin gì ta cần 1 khóa bí mật
	    private Claims extractAllClaims(String token) {
	        try {
//	            logger.info(Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody());
	            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	        } catch (ExpiredJwtException e) {
	            logger.error(e.getMessage());
	        } catch (UnsupportedJwtException e) {
	            logger.error(e.getMessage());
	        } catch (MalformedJwtException e) {
	            logger.error(e.getMessage());
	        } catch (SignatureException e) {
	            logger.error(e.getMessage());
	        } catch (IllegalArgumentException e) {
	            logger.error(e.getMessage());
	        }
	        return null;
	    }
	    
	    // kiểm tra xem mã thông báo đã hết hạn hay chưa
	    private Boolean isTokenExpired(String token) {
	        return extractExpiration(token).before(new Date());
	    }

	    //    tạo token cho người dùng
	    public String generateToken(UserDetails userDetails) {
	        Map<String, Object> claims = new HashMap<>();
	        return createToken(claims, userDetails.getUsername());
	    }

	    //    while creating the token -
//	    1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
//	    2. Sign the JWT using the HS512 algorithm and secret key.
//	    3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
//	    compaction of the JWT to a URL-safe string
	    private String createToken(Map<String, Object> claims, String subject) {

	        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
	                .setExpiration(new Date(System.currentTimeMillis() + 10000 * JWT_TOKEN_VALIDITY))
	                .setIssuer("Kha-kha")
	                .setHeaderParam("tokenType", "Bearer ")
	                .setAudience("You")
	                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
	    }

	    public Boolean validateToken(String token, UserDetails userDetails) {
	        final String username = extractUsername(token);
	        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	    }
}
